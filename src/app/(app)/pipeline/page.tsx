import { createClient } from '@/lib/supabase/server'
import { KanbanBoard } from '@/components/pipeline/kanban-board'
import type { Opportunity } from '@/lib/types'

export const dynamic = 'force-dynamic'

interface PageProps {
  error?: string
}

export default async function PipelinePage({ error: initialError }: PageProps) {
  let opportunities: Opportunity[] = []
  let loadError: string | null = null

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[PipelinePage] Error loading opportunities:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      loadError = 'Failed to load pipeline data. Please try again.'
    } else {
      opportunities = data ?? []
    }
  } catch (err) {
    console.error('[PipelinePage] Unexpected error:', err)
    loadError = 'An unexpected error occurred. Please try again.'
  }

  // Propagate server-side error state to the client component.
  if (initialError) {
    loadError = initialError
  }

  return (
    <KanbanBoard
      initialOpportunities={opportunities}
      loadError={loadError}
    />
  )
}
