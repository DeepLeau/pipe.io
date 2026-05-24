'use client'

import { useState, useRef } from 'react'
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  type CollisionDetection,
  pointerWithin,
} from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import { KanbanColumn } from './kanban-column'
import { OpportunityCard } from './opportunity-card'
import { AddOpportunityModal } from './add-opportunity-modal'
import type { Opportunity, Stage } from '@/lib/types'

// ── Stage config ──────────────────────────────────────────────────────────────

const STAGES: Stage[] = ['discovery', 'meeting_booked', 'closed_won', 'closed_lost']

const STAGE_LABELS: Record<Stage, string> = {
  discovery: 'Discovery',
  meeting_booked: 'Meeting Booked',
  closed_won: 'Closed Won',
  closed_lost: 'Closed Lost',
}

// ── Helpers ────────────────────────────────────────────────────────────────────

type GroupedOpportunities = Record<Stage, Opportunity[]>

function groupByStage(opportunities: Opportunity[]): GroupedOpportunities {
  const groups: GroupedOpportunities = {
    discovery: [],
    meeting_booked: [],
    closed_won: [],
    closed_lost: [],
  }
  for (const opp of opportunities) {
    if (groups[opp.stage]) {
      groups[opp.stage].push(opp)
    }
  }
  return groups
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface KanbanBoardProps {
  initialOpportunities: Opportunity[]
  loadError?: string | null
}

// ── Component ─────────────────────────────────────────────────────────────────

export function KanbanBoard({ initialOpportunities, loadError }: KanbanBoardProps) {
  const [grouped, setGrouped] = useState<GroupedOpportunities>(() =>
    groupByStage(initialOpportunities)
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeOpp, setActiveOpp] = useState<Opportunity | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  // Snapshot du state pour rollback en cas d'erreur API
  const prevGroupedRef = useRef<GroupedOpportunities>(grouped)

  // ── Drag handlers ──────────────────────────────────────────────────────────

  function handleDragStart({ active }: DragStartEvent) {
    const opp = Object.values(grouped)
      .flat()
      .find((o) => o.id === active.id)
    setActiveOpp(opp ?? null)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveOpp(null)

    if (!over) return

    const oppId = String(active.id)
    const targetStage = over.id as Stage

    // Valide que targetStage est un stage connu
    if (!STAGES.includes(targetStage)) return

    // Snapshot pour rollback
    prevGroupedRef.current = grouped

    // Lecture de l'opportunité source
    let movedOpp: Opportunity | null = null
    const newGrouped: GroupedOpportunities = {
      discovery: [],
      meeting_booked: [],
      closed_won: [],
      closed_lost: [],
    }

    for (const stage of STAGES) {
      const column = grouped[stage]
      const idx = column.findIndex((o) => o.id === oppId)
      if (idx !== -1) {
        movedOpp = { ...column[idx], stage: targetStage }
        // Copie toutes les colonnes, retire l'item de sa colonne source
        for (const s of STAGES) {
          newGrouped[s] = grouped[s].filter((o) => o.id !== oppId)
        }
        break
      }
    }

    if (!movedOpp) return

    // Ne rien faire si la carte reste dans la même colonne
    if (movedOpp.stage === (over.id as Stage)) return

    // Mise à jour optimiste immédiate
    const optimistic: GroupedOpportunities = {
      ...grouped,
      [movedOpp.stage]: [...grouped[movedOpp.stage], movedOpp],
    }
    for (const s of STAGES) {
      if (s !== movedOpp!.stage) {
        optimistic[s] = grouped[s].filter((o) => o.id !== oppId)
      }
    }
    setGrouped(optimistic)
    setApiError(null)

    // Appel API en arrière-plan
    fetch(`/api/opportunities/${oppId}/stage`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: targetStage }),
    }).then(async (res) => {
      if (!res.ok) {
        // Rollback sur erreur
        setGrouped(prevGroupedRef.current)
        const data = await res.json().catch(() => ({ error: 'Unknown error' }))
        setApiError(data.error ?? 'Failed to move opportunity')
      }
    })
  }

  // ── Gestion de la modale ──────────────────────────────────────────────────

  function handleOppCreated(opp: Opportunity) {
    setGrouped((prev) => ({
      ...prev,
      [opp.stage]: [...prev[opp.stage], opp],
    }))
  }

  // ── Display error ──────────────────────────────────────────────────────────

  const displayError = loadError || apiError

  // ── Rendu ─────────────────────────────────────────────────────────────────

  return (
    <>
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-4 h-full">
          {/* Barre d'entête */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-semibold text-[var(--text-1)]">Pipeline</h1>
              <span className="inline-flex items-center h-5 px-2 rounded bg-white/[0.05] text-[11px] font-mono text-[var(--text-3)] border border-[var(--border-md)]">
                {Object.values(grouped).flat().length} deals
              </span>
            </div>
            <div className="flex items-center gap-2">
              {displayError && (
                <span className="text-[11px] text-[var(--red)]">
                  {displayError}
                </span>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-8 px-3 flex items-center justify-center gap-1.5 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white text-xs font-medium transition-colors duration-150"
              >
                <Plus size={13} strokeWidth={2} className="shrink-0" />
                Add Opportunity
              </button>
            </div>
          </div>

          {/* Colonnes Kanban */}
          <div className="flex gap-3 flex-1 min-h-0 overflow-x-auto pb-2">
            {STAGES.map((stage) => (
              <KanbanColumn
                key={stage}
                stage={stage}
                label={STAGE_LABELS[stage]}
                opportunities={grouped[stage]}
              />
            ))}
          </div>
        </div>

        {/* Drag overlay — carte fantôme pendant le drag */}
        <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
          {activeOpp ? (
            <OpportunityCard opportunity={activeOpp} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Modale d'ajout */}
      {isModalOpen && (
        <AddOpportunityModal
          onSuccess={handleOppCreated}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
