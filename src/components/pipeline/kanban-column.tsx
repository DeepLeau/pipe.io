'use client'

import { useDroppable } from '@dnd-kit/core'
import { OpportunityCard } from './opportunity-card'
import type { Opportunity, Stage } from '@/lib/types'

// ── Stage visual config ────────────────────────────────────────────────────────

const STAGE_DOT: Record<Stage, string> = {
  discovery: 'bg-blue-400',
  meeting_booked: 'bg-violet-400',
  closed_won: 'bg-emerald-400',
  closed_lost: 'bg-red-400',
}

const STAGE_BG: Record<Stage, string> = {
  discovery: 'bg-blue-950/30',
  meeting_booked: 'bg-violet-950/30',
  closed_won: 'bg-emerald-950/30',
  closed_lost: 'bg-red-950/30',
}

const STAGE_BG_DRAG: Record<Stage, string> = {
  discovery: 'bg-blue-900/40',
  meeting_booked: 'bg-violet-900/40',
  closed_won: 'bg-emerald-900/40',
  closed_lost: 'bg-red-900/40',
}

// ── Props ────────────────────────────────────────────────────────────────────────

interface KanbanColumnProps {
  stage: Stage
  label: string
  opportunities: Opportunity[]
}

// ── Component ──────────────────────────────────────────────────────────────────

export function KanbanColumn({ stage, label, opportunities }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col w-60 shrink-0 rounded-lg border border-[var(--border-md)] overflow-hidden transition-colors duration-150"
      style={{
        backgroundColor: 'var(--surface-1)',
      }}
    >
      {/* Header de colonne */}
      <div
        className={`flex items-center justify-between px-3 py-2.5 border-b border-[var(--border)] transition-colors duration-150 ${isOver ? STAGE_BG_DRAG[stage] : STAGE_BG[stage]}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STAGE_DOT[stage]}`} />
          <span className="text-xs font-medium text-[var(--text-1)] truncate">
            {label}
          </span>
          <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-white/[0.06] text-[11px] font-mono text-[var(--text-3)] shrink-0">
            {opportunities.length}
          </span>
        </div>
      </div>

      {/* Liste de cartes */}
      <div
        className={`flex flex-col gap-2 p-2 flex-1 min-h-[120px] transition-colors duration-150 ${isOver ? STAGE_BG_DRAG[stage] : ''}`}
      >
        {opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
            <p className="text-[11px] text-[var(--text-3)]">No deals</p>
            <p className="text-[10px] text-[var(--text-3)] mt-0.5">
              Drag a card here
            </p>
          </div>
        ) : (
          opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))
        )}
      </div>
    </div>
  )
}
