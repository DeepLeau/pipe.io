import Link from 'next/link'
import { features } from '@/lib/data'

const icons: Record<string, React.ReactNode> = {
  columns: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="3" height="10" rx="1" fill="#88deeb" />
      <rect x="6.5" y="3" width="3" height="7" rx="1" fill="#ec652b" />
      <rect x="11" y="3" width="3" height="4" rx="1" fill="#fff" />
    </svg>
  ),
  trending: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 13V8m4 5V4m4 9v-6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5" stroke="#fff" strokeWidth="1.5" />
      <path d="M8 5v3l2 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  list: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 4h10M3 8h10M3 12h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8l3 3 9-9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  inbox: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#fff" strokeWidth="1.4" />
      <path d="M2 6h12" stroke="#fff" strokeWidth="1.4" />
    </svg>
  ),
}

const iconColors = ['#111a4a', '#ec652b', '#167e6c', '#111a4a', '#ec652b', '#167e6c']

export default function FeaturesSection() {
  return (
    <section id="workflow" className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-action-orange)]">// What you get</span>
            <h2 className="text-[40px] leading-[1.1] tracking-[var(--tracking-heading)] font-semibold mt-2 text-[var(--color-ink-blue)]">
              Built for the work, not the report.
            </h2>
            <p className="mt-4 text-[16px] text-[var(--color-slate-text)]">
              Every feature exists because a sales lead asked for it after losing a deal. No CRM bloat, no admin tax — just the surface area you need to move a deal from cold to closed.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 mt-8 bg-[var(--color-action-orange)] text-white rounded-lg px-[22px] py-[12px] text-[14px] font-medium shadow-[rgba(236,101,43,0.25)_0px_1px_2px_0px,rgba(255,255,255,0.25)_0px_1px_0px_0px_inset] hover:bg-[#d8581f] transition-colors duration-150"
            >
              Sign up — free for 14 days
            </Link>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={feature.id} className="card-subtle p-6">
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center mb-4"
                  style={{ background: iconColors[i] }}
                >
                  {icons[feature.icon]}
                </div>
                <h3 className="text-[18px] font-medium tracking-[var(--tracking-subheading)] text-[var(--color-ink-blue)]">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[var(--color-slate-text)] mt-1.5 tracking-[var(--tracking-body)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
