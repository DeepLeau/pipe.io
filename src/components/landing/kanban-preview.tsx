import Link from 'next/link'
import { kanbanDeals } from '@/lib/data'

const DealTag = ({ tag, type }: { tag: string; type: string }) => {
  const styles: Record<string, string> = {
    plum: 'bg-[rgba(17,26,74,0.05)] text-[var(--color-deep-plum)] border border-[rgba(17,26,74,0.12)]',
    orange: 'bg-[rgba(236,101,43,0.08)] text-[var(--color-action-orange)] border border-[rgba(236,101,43,0.2)]',
    cyan: 'bg-[rgba(22,126,108,0.08)] text-[var(--color-callout-cyan)] border border-[rgba(22,126,108,0.2)]',
    moss: 'bg-[rgba(68,180,139,0.08)] text-[var(--color-success-moss)] border border-[rgba(68,180,139,0.2)]',
    gray: 'bg-transparent text-[var(--color-slate-text)] border border-[var(--color-steel-gray)]',
  }
  
  return (
    <span className={`text-[10px] font-[family-name:var(--font-mono)] px-[6px] py-[2px] rounded ${styles[type] || styles.gray}`}>
      {tag}
    </span>
  )
}

export default function KanbanPreview() {
  return (
    <section id="product" className="relative" style={{ background: 'var(--color-fog-gray)' }}>
      <div className="absolute inset-0 dotted-grid-faint opacity-50 pointer-events-none" />
      <div className="relative max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-action-orange)]">// The board</span>
            <h2 className="text-[40px] leading-[1.1] tracking-[var(--tracking-heading)] font-semibold mt-2 max-w-[640px] text-[var(--color-ink-blue)]">
              Your pipe, one screen, no scrolling.
            </h2>
            <p className="mt-3 text-[16px] text-[var(--color-slate-text)] max-w-[560px]">
              Four stages. Drag. Drop. Done. Everything else — owner, MRR, next step, last touch — sits on the card where you actually need it.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[rgba(17,26,74,0.05)] text-[var(--color-deep-plum)] border border-[rgba(17,26,74,0.12)] text-[11px] font-[family-name:var(--font-mono)] px-2 py-1 rounded">
              Q1 BOARD · 24 DEALS
            </span>
            <span className="bg-[rgba(236,101,43,0.08)] text-[var(--color-action-orange)] border border-[rgba(236,101,43,0.2)] text-[11px] font-[family-name:var(--font-mono)] px-2 py-1 rounded">
              $847K WEIGHTED
            </span>
          </div>
        </div>

        <div className="card-xl rounded-xl bg-white p-5">
          {/* Board toolbar */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-steel-gray)]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-slate-text)] ml-2">app.pipeline.io / boards / q1-enterprise</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center justify-center bg-white/50 text-[var(--color-charcoal-text)] border border-[var(--color-steel-gray)] rounded-lg px-[10px] py-[5px] text-[12px] hover:bg-white transition-colors duration-150">
                Filter
              </button>
              <button className="inline-flex items-center justify-center bg-white/50 text-[var(--color-charcoal-text)] border border-[var(--color-steel-gray)] rounded-lg px-[10px] py-[5px] text-[12px] hover:bg-white transition-colors duration-150">
                Owner: All
              </button>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-action-orange)] text-white rounded-lg px-[12px] py-[5px] text-[12px] font-medium shadow-[rgba(236,101,43,0.25)_0px_1px_2px_0px,rgba(255,255,255,0.25)_0px_1px_0px_0px_inset] hover:bg-[#d8581f] transition-colors duration-150"
              >
                + New deal
              </Link>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 overflow-x-auto">
            {/* PROSPECTING */}
            <div className="column-bg p-3 min-w-[240px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-info-blue)]" />
                  <span className="text-[13px] font-medium text-[var(--color-ink-blue)]">Prospecting</span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-slate-text)]">{kanbanDeals.prospecting.length}</span>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-slate-text)]">$182K</span>
              </div>
              <div className="space-y-2">
                {kanbanDeals.prospecting.map((deal) => (
                  <div key={deal.id} className="deal-card">
                    <div className="flex items-start justify-between">
                      <span className="text-[13px] font-medium text-[var(--color-ink-blue)]">{deal.name}</span>
                      {deal.tag && <DealTag tag={deal.tag} type={deal.tagType || 'gray'} />}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-slate-text)] mt-1">{deal.value}</div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--color-slate-text)]">
                      <span>{deal.owner}</span>
                      <span>{deal.touched}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUALIFICATION */}
            <div className="column-bg p-3 min-w-[240px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-deep-plum)]" />
                  <span className="text-[13px] font-medium text-[var(--color-ink-blue)]">Qualification</span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-slate-text)]">{kanbanDeals.qualification.length}</span>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-slate-text)]">$214K</span>
              </div>
              <div className="space-y-2">
                {kanbanDeals.qualification.map((deal) => (
                  <div key={deal.id} className="deal-card">
                    <div className="flex items-start justify-between">
                      <span className="text-[13px] font-medium text-[var(--color-ink-blue)]">{deal.name}</span>
                      {deal.tag && <DealTag tag={deal.tag} type={deal.tagType || 'gray'} />}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-slate-text)] mt-1">{deal.value}</div>
                    {deal.nextStep && (
                      <div className="mt-2 text-[11px] text-[var(--color-charcoal-text)] bg-[var(--color-fog-gray)] rounded px-2 py-1 border border-[var(--color-steel-gray)]">
                        Next: {deal.nextStep}
                      </div>
                    )}
                    <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-slate-text)]">
                      <span>{deal.owner}</span>
                      {deal.score && <span>Score {deal.score}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NEGOTIATION */}
            <div className="column-bg p-3 min-w-[240px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-action-orange)]" />
                  <span className="text-[13px] font-medium text-[var(--color-ink-blue)]">Negotiation</span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-slate-text)]">{kanbanDeals.negotiation.length}</span>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-slate-text)]">$312K</span>
              </div>
              <div className="space-y-2">
                {kanbanDeals.negotiation.map((deal) => (
                  <div
                    key={deal.id}
                    className="deal-card"
                    style={deal.id === 7 ? { boxShadow: 'rgba(236,101,43,0.4) 0 0 0 1px, rgba(0,0,0,0.08) 0px 4px 12px -2px' } : undefined}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[13px] font-medium text-[var(--color-ink-blue)]">{deal.name}</span>
                      {deal.tag && <DealTag tag={deal.tag} type={deal.tagType || 'gray'} />}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-slate-text)] mt-1">{deal.value}</div>
                    {deal.nextStep && (
                      <div className="mt-2 text-[11px] text-[var(--color-charcoal-text)] bg-white rounded px-2 py-1 border border-dashed border-[var(--color-action-orange)]">
                        {deal.nextStep}
                      </div>
                    )}
                    <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-slate-text)]">
                      <span>{deal.owner}</span>
                      {deal.closeDate && <span>{deal.closeDate}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CLOSED */}
            <div className="column-bg p-3 min-w-[240px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success-moss)]" />
                  <span className="text-[13px] font-medium text-[var(--color-ink-blue)]">Closed</span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-slate-text)]">{kanbanDeals.closed.length}</span>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-success-moss)]">$139K</span>
              </div>
              <div className="space-y-2">
                {kanbanDeals.closed.map((deal) => (
                  <div key={deal.id} className={`deal-card ${deal.tag === 'LOST' ? 'opacity-70' : ''}`}>
                    <div className="flex items-start justify-between">
                      <span className="text-[13px] font-medium text-[var(--color-ink-blue)]">{deal.name}</span>
                      {deal.tag && <DealTag tag={deal.tag} type={deal.tagType || 'gray'} />}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-slate-text)] mt-1">{deal.value}</div>
                    {deal.reason && (
                      <div className="mt-2 text-[11px] text-[var(--color-slate-text)]">Reason: {deal.reason}</div>
                    )}
                    {deal.closeDate && !deal.reason && (
                      <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-slate-text)]">
                        <span>{deal.owner}</span>
                        <span>{deal.closeDate}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
