/**
 * TypeScript types for the Sales Pipeline feature.
 * Mirrors the columns defined in migrations/0002_create_opportunities.sql.
 */

export type Stage = 'discovery' | 'meeting_booked' | 'closed_won' | 'closed_lost'

export interface Opportunity {
  id: string
  organization_id: string
  company_name: string
  prospect_name: string
  prospect_position: string | null
  stage: Stage
  created_at: string
  updated_at: string
}

/** Human-readable labels for each pipeline stage. */
export const STAGE_LABELS: Record<Stage, string> = {
  discovery: 'Discovery',
  meeting_booked: 'Meeting Booked',
  closed_won: 'Closed Won',
  closed_lost: 'Closed Lost',
}

export const VALID_STAGES: readonly Stage[] = [
  'discovery',
  'meeting_booked',
  'closed_won',
  'closed_lost',
] as const
