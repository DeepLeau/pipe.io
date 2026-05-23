import Link from 'next/link'

const footerLinks = {
  Product: ['Kanban board', 'Forecasting', 'Integrations', 'Changelog'],
  Company: ['About', 'Customers', 'Careers', 'Contact'],
  Resources: ['Docs', 'API', 'Security', 'Status'],
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-steel-gray)]" style={{ background: 'var(--color-fog-gray)' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-7 h-7 bg-[var(--color-deep-plum)] rounded-md flex items-center justify-center shadow-[rgba(255,255,255,0.2)_0_0_0_1px_inset]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="4" height="12" rx="1" fill="#ec652b" />
                  <rect x="6" y="1" width="4" height="8" rx="1" fill="#88deeb" />
                  <rect x="11" y="1" width="2" height="5" rx="1" fill="#fff" />
                </svg>
              </span>
              <span className="text-[16px] font-semibold tracking-[var(--tracking-subheading)] text-[var(--color-ink-blue)]">
                Pipeline<span className="text-[var(--color-action-orange)]">.io</span>
              </span>
            </Link>
            <p className="text-[13px] text-[var(--color-slate-text)] mt-4 max-w-[280px] tracking-[var(--tracking-body)]">
              Sales pipeline software for teams who&apos;d rather close than report.
            </p>
            <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)] mt-6">
              © 2025 · Pipeline Systems, Inc.
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-2">
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)] mb-4">
                {category}
              </div>
              <ul className="space-y-2.5 text-[14px]">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[var(--color-charcoal-text)] hover:text-[var(--color-deep-plum)] transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)] mb-4">
              Get started
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-action-orange)] text-white rounded-lg px-[16px] py-[9px] text-[13px] font-medium shadow-[rgba(236,101,43,0.25)_0px_1px_2px_0px,rgba(255,255,255,0.25)_0px_1px_0px_0px_inset] hover:bg-[#d8581f] transition-colors duration-150"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
