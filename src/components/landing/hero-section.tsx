import Link from 'next/link'
import { metrics } from '@/lib/data'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--color-ghost-white) 0%, var(--color-ghost-white) 60%, #fafafb 100%)' }}>
      <div className="absolute inset-0 dotted-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px blueprint-line" />

      <div className="relative max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)]">v2.4</span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-steel-gray)]" />
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-deep-plum)]">Pipeline release notes — Q1</span>
          <a href="#changelog" className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-action-orange)] inline-flex items-center gap-1 hover:underline">
            Read →
          </a>
        </div>

        <h1 className="text-[44px] md:text-[60px] leading-[1.02] tracking-[var(--tracking-display)] font-semibold text-[var(--color-ink-blue)] max-w-[900px]">
          Move deals.<br />Not rows in a spreadsheet.
        </h1>
        <p className="mt-6 text-[18px] leading-[1.5] tracking-[var(--tracking-subheading)] text-[var(--color-slate-text)] max-w-[620px] font-light">
          Pipeline.io is a sales pipeline built for the people who actually close. Drag opportunities through your stages, see where the money is sitting, and stop losing deals to bad hygiene.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-action-orange)] text-white rounded-lg px-[22px] py-[12px] text-[15px] font-medium shadow-[rgba(236,101,43,0.25)_0px_1px_2px_0px,rgba(255,255,255,0.25)_0px_1px_0px_0px_inset] hover:bg-[#d8581f] transition-colors duration-150"
          >
            Sign up
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="#product"
            className="inline-flex items-center justify-center bg-transparent text-[var(--color-deep-plum)] border border-[var(--color-deep-plum)] rounded-lg px-[24px] py-[10px] text-[14px] font-medium hover:bg-[var(--color-deep-plum)]/[0.04] transition-colors duration-150"
          >
            See the board
          </Link>
          <div className="flex items-center gap-2 ml-2">
            <kbd className="inline-flex items-center justify-center px-[6px] py-[2px] border border-[var(--color-steel-gray)] rounded text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-slate-text)] bg-white">⌘</kbd>
            <kbd className="inline-flex items-center justify-center px-[6px] py-[2px] border border-[var(--color-steel-gray)] rounded text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-slate-text)] bg-white">K</kbd>
            <span className="text-[12px] text-[var(--color-slate-text)]">to create a deal anywhere</span>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-steel-gray)] border border-[var(--color-steel-gray)] rounded-lg overflow-hidden">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white px-6 py-5">
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-slate-text)]">{metric.label}</div>
              <div className="text-[28px] font-medium tracking-[var(--tracking-heading-sm)] text-[var(--color-ink-blue)] mt-1">{metric.value}</div>
              <div className="text-[12px] text-[var(--color-slate-text)]">{metric.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
