import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { VALID_STAGES, type Stage } from '@/lib/types'

interface RouteParams {
  params: Promise<{ id: string }>
}

/**
 * PATCH /api/opportunities/[id]/stage — updates the stage of an opportunity.
 * Only allowed for opportunities belonging to the user's organization.
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { id } = await params

  let body: { stage: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const { stage } = body

  // Validate stage is one of the 4 allowed values
  if (
    typeof stage !== 'string' ||
    !VALID_STAGES.includes(stage as Stage)
  ) {
    return NextResponse.json(
      { error: 'invalid stage' },
      { status: 400 }
    )
  }

  // First, verify the opportunity exists AND belongs to the user's org.
  // This prevents cross-organization updates.
  const { data: existing, error: fetchError } = await supabase
    .from('opportunities')
    .select('id')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const { data, error: updateError } = await supabase
    .from('opportunities')
    .update({
      stage: stage as Stage,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    console.error('[PATCH /api/opportunities/[id]/stage]', {
      code: updateError.code,
      message: updateError.message,
    })
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }

  return NextResponse.json({ opportunity: data }, { status: 200 })
}
