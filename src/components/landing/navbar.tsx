import Link from 'next/link'

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#customers' },
  { label: 'Changelog', href: '#changelog' },
]

export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-steel-gray)] bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-[var(--color-deep-plum)] rounded-md flex items-center justify-center shadow-[rgba(255,255,255,0.2)_0_0_0_1px_inset]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="4" height="12" rx="1" fill="#ec652b" />
                <rect x="6" y="1" width="4" height="8" rx="1" fill="#88deeb" />
                <rect x="11" y="1" width="2" height="5" rx="1" fill="#fff" />
              </svg>
            </span>
            <span className="text-[17px] font-semibold tracking-[var(--tracking-subheading)] text-[var(--color-ink-blue)]">
              Pipeline<span className="text-[var(--color-action-orange)]">.io</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] text-[var(--color-ink-blue)] hover:text-[var(--color-deep-plum)] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/signup" className="hidden sm:inline-flex text-[14px] text-[var(--color-ink-blue)] hover:text-[var(--color-deep-plum)] transition-colors duration-150">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-action-orange)] text-white rounded-lg px-[18px] py-[10px] text-[14px] font-medium tracking-[var(--tracking-body)] shadow-[rgba(236,101,43,0.25)_0px_1px_2px_0px,rgba(255,255,255,0.25)_0px_1px_0px_0px_inset] hover:bg-[#d8581f] transition-colors duration-150"
          >
            Sign up
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
