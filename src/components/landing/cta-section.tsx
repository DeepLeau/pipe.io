import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="absolute inset-0 dotted-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-[1100px] mx-auto px-6 py-28 text-center">
        <h2 className="text-[48px] md:text-[60px] leading-[1.02] tracking-[var(--tracking-display)] font-semibold max-w-[900px] mx-auto text-[var(--color-ink-blue)]">
          Stop managing your pipe.<br />Start closing it.
        </h2>
        <p className="mt-6 text-[17px] text-[var(--color-slate-text)] max-w-[540px] mx-auto">
          Sign up in under a minute. Import your deals. Move your first card before your next coffee gets cold.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-action-orange)] text-white rounded-lg px-[28px] py-[14px] text-[15px] font-medium shadow-[rgba(236,101,43,0.25)_0px_1px_2px_0px,rgba(255,255,255,0.25)_0px_1px_0px_0px_inset] hover:bg-[#d8581f] transition-colors duration-150"
          >
            Sign up — free
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="text-[13px] text-[var(--color-slate-text)]">No credit card · 14-day team trial</span>
        </div>
      </div>
    </section>
  )
}
