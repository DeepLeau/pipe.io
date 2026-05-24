import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { VALID_STAGES, type Stage } from '@/lib/types'

/** GET /api/opportunities — returns all opportunities for the user's org, newest first. */
export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[GET /api/opportunities]', {
      code: error.code,
      message: error.message,
    })
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }

  return NextResponse.json({ opportunities: data }, { status: 200 })
}

interface CreateOpportunityBody {
  company_name: string
  prospect_name: string
  prospect_position?: string
  initial_stage: string
}

/** POST /api/opportunities — creates a new opportunity in the user's org. */
export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: CreateOpportunityBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const { company_name, prospect_name, prospect_position, initial_stage } = body

  // Validate required fields
  if (
    typeof company_name !== 'string' ||
    company_name.trim().length === 0
  ) {
    return NextResponse.json(
      { error: 'company_name is required and must be a non-empty string' },
      { status: 400 }
    )
  }

  if (
    typeof prospect_name !== 'string' ||
    prospect_name.trim().length === 0
  ) {
    return NextResponse.json(
      { error: 'prospect_name is required and must be a non-empty string' },
      { status: 400 }
    )
  }

  // Validate initial_stage is one of the 4 allowed values
  if (
    typeof initial_stage !== 'string' ||
    !VALID_STAGES.includes(initial_stage as Stage)
  ) {
    return NextResponse.json(
      { error: 'initial_stage must be one of: discovery, meeting_booked, closed_won, closed_lost' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('opportunities')
    .insert({
      company_name: company_name.trim(),
      prospect_name: prospect_name.trim(),
      prospect_position: typeof prospect_position === 'string' ? prospect_position.trim() || null : null,
      stage: initial_stage as Stage,
    })
    .select()
    .single()

  if (error) {
    console.error('[POST /api/opportunities]', {
      code: error.code,
      message: error.message,
      details: error.details,
    })
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }

  return NextResponse.json({ opportunity: data }, { status: 201 })
}
