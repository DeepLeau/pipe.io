import { comparisonRows } from '@/lib/data'

export default function ComparisonSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="max-w-[640px] mb-12">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-action-orange)]">// Why not a spreadsheet</span>
          <h2 className="text-[40px] leading-[1.1] tracking-[var(--tracking-heading)] font-semibold mt-2 text-[var(--color-ink-blue)]">
            Spreadsheets work — until they don&apos;t.
          </h2>
          <p className="mt-3 text-[16px] text-[var(--color-slate-text)]">
            You know the moment. Two reps editing the same row. Forecast wrong by Wednesday. A deal slipped because nobody updated "Last contact." Pipeline.io fixes the structure, not the symptom.
          </p>
        </div>

        <div className="card-subtle overflow-hidden">
          <div className="grid grid-cols-3 border-b border-[var(--color-steel-gray)]">
            <div className="p-5 border-r border-[var(--color-steel-gray)]">
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)]">What</div>
            </div>
            <div className="p-5 border-r border-[var(--color-steel-gray)]">
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)]">Spreadsheet</div>
            </div>
            <div className="p-5 bg-[var(--color-fog-gray)]">
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-deep-plum)]">Pipeline.io</div>
            </div>
          </div>

          <div className="divide-y divide-[var(--color-steel-gray)]">
            {comparisonRows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 items-center">
                <div className="p-5 border-r border-[var(--color-steel-gray)] text-[14px] text-[var(--color-ink-blue)]">{row.feature}</div>
                <div className="p-5 border-r border-[var(--color-steel-gray)] text-[13px] text-[var(--color-slate-text)]">{row.spreadsheet}</div>
                <div className="p-5 bg-[var(--color-fog-gray)] text-[13px] text-[var(--color-ink-blue)]">{row.pipeline}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
