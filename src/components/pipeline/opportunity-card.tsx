'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Opportunity } from '@/lib/types'

// ── Props ──────────────────────────────────────────────────────────────────────

interface OpportunityCardProps {
  opportunity: Opportunity
  isDragging?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────────

export function OpportunityCard({
  opportunity,
  isDragging = false,
}: OpportunityCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({
    id: opportunity.id,
  })

  const dragging = isDragging || isSortableDragging

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[var(--surface-2)] border border-[var(--border-md)] rounded-md px-3 py-2.5 cursor-grab active:cursor-grabbing select-none hover:border-[var(--border-hi)] transition-colors duration-150 group"
    >
      {/* Entreprise + Tag */}
      <div className="flex items-start justify-between gap-2 min-w-0 mb-1">
        <span className="text-xs font-medium text-[var(--text-1)] truncate min-w-0">
          {opportunity.company_name}
        </span>
      </div>

      {/* Prospect */}
      <div className="min-w-0">
        <p className="text-xs text-[var(--text-2)] truncate">
          {opportunity.prospect_name}
        </p>
        {opportunity.prospect_position && (
          <p className="text-[11px] text-[var(--text-3)] truncate mt-0.5">
            {opportunity.prospect_position}
          </p>
        )}
      </div>

      {/* Hover indicator */}
      <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <div className="w-1 h-px rounded-full bg-[var(--accent)] shrink-0" />
      </div>

      {/* Draggable overlay visual cue */}
      {dragging && (
        <div className="absolute inset-0 rounded-md border-2 border-[var(--accent)]/40 bg-[var(--accent)]/5 pointer-events-none" />
      )}
    </div>
  )
}
