'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Opportunity, Stage } from '@/lib/types'

// ── Constants ─────────────────────────────────────────────────────────────────

const STAGES: Stage[] = ['discovery', 'meeting_booked', 'closed_won', 'closed_lost']

const STAGE_LABELS: Record<Stage, string> = {
  discovery: 'Discovery',
  meeting_booked: 'Meeting Booked',
  closed_won: 'Closed Won',
  closed_lost: 'Closed Lost',
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface AddOpportunityModalProps {
  onSuccess: (opportunity: Opportunity) => void
  onClose: () => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AddOpportunityModal({
  onSuccess,
  onClose,
}: AddOpportunityModalProps) {
  const [companyName, setCompanyName] = useState('')
  const [prospectName, setProspectName] = useState('')
  const [prospectPosition, setProspectPosition] = useState('')
  const [stage, setStage] = useState<Stage>('discovery')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fermer sur Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Empêcher le scroll du body quand la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validation côté UI avant l'appel réseau
    const trimmedCompany = companyName.trim()
    const trimmedProspect = prospectName.trim()

    if (!trimmedCompany) {
      setError('Company name is required.')
      return
    }
    if (!trimmedProspect) {
      setError('Prospect name is required.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: trimmedCompany,
          prospect_name: trimmedProspect,
          prospect_position: prospectPosition.trim() || null,
          initial_stage: stage,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        onSuccess(data.opportunity)
        onClose()
      } else {
        const data = await res.json().catch(() => ({ error: 'Failed to create opportunity' }))
        setError(data.error ?? 'Failed to create opportunity')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div className="relative w-full max-w-sm bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
          <h2 className="text-sm font-semibold text-[var(--text-1)]">
            New Opportunity
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150"
            aria-label="Close"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-5 py-5 flex flex-col gap-4">
          {/* Company name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="company_name"
              className="text-xs font-medium text-[var(--text-2)]"
            >
              Company name <span className="text-[var(--red)]">*</span>
            </label>
            <input
              id="company_name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Corp"
              autoComplete="organization"
              className="h-9 px-3 rounded-md text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] bg-[var(--surface-2)] border border-[var(--border-md)] focus:outline-none focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150"
            />
          </div>

          {/* Prospect name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="prospect_name"
              className="text-xs font-medium text-[var(--text-2)]"
            >
              Prospect name <span className="text-[var(--red)]">*</span>
            </label>
            <input
              id="prospect_name"
              type="text"
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
              placeholder="Jane Smith"
              autoComplete="name"
              className="h-9 px-3 rounded-md text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] bg-[var(--surface-2)] border border-[var(--border-md)] focus:outline-none focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150"
            />
          </div>

          {/* Prospect position */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="prospect_position"
              className="text-xs font-medium text-[var(--text-2)]"
            >
              Position{' '}
              <span className="text-[var(--text-3)] font-normal">(optional)</span>
            </label>
            <input
              id="prospect_position"
              type="text"
              value={prospectPosition}
              onChange={(e) => setProspectPosition(e.target.value)}
              placeholder="VP of Engineering"
              autoComplete="organization-title"
              className="h-9 px-3 rounded-md text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] bg-[var(--surface-2)] border border-[var(--border-md)] focus:outline-none focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150"
            />
          </div>

          {/* Stage */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="stage"
              className="text-xs font-medium text-[var(--text-2)]"
            >
              Initial stage
            </label>
            <div className="relative">
              <select
                id="stage"
                value={stage}
                onChange={(e) => setStage(e.target.value as Stage)}
                className="h-9 w-full pl-3 pr-8 rounded-md text-sm appearance-none cursor-pointer bg-[var(--surface-2)] border border-[var(--border-md)] text-[var(--text-1)] focus:outline-none focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors duration-150"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {STAGE_LABELS[s]}
                  </option>
                ))}
              </select>
              <ChevronDownIcon />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-[11px] text-[var(--red)] flex items-center gap-1.5 px-3 py-2 rounded-md bg-[var(--red)]/8 border border-[var(--red)]/20">
              <span className="w-1 h-1 rounded-full bg-[var(--red)] shrink-0" />
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border)] shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-8 px-4 flex items-center justify-center rounded-md border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-xs font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-8 px-4 flex items-center justify-center gap-2 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white text-xs font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white shrink-0 animate-spin" />
                <span>Adding…</span>
              </>
            ) : (
              'Add Opportunity'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Inline chevron icon ─────────────────────────────────────────────────────────

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
