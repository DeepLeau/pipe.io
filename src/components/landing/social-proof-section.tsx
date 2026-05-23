import { testimonials, companies } from '@/lib/data'

export default function SocialProofSection() {
  return (
    <section id="customers" className="relative" style={{ background: 'var(--color-fog-gray)' }}>
      <div className="absolute inset-0 dotted-grid-faint opacity-40 pointer-events-none" />
      <div className="relative max-w-[1200px] mx-auto px-6 py-24">
        <div className="flex items-center gap-2 mb-10">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)]">// Trusted by sales teams at</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center mb-20 opacity-70">
          {companies.map((company) => (
            <div key={company} className="text-[18px] font-semibold tracking-[var(--tracking-heading-sm)] text-[var(--color-charcoal-text)]">
              {company}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8">
            <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-action-orange)] mb-4">
              // Customer note
            </div>
            <blockquote className="text-[28px] md:text-[32px] leading-[1.25] tracking-[var(--tracking-heading-sm)] font-light text-[var(--color-ink-blue)]">
              "{testimonials[0].quote}"
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-deep-plum)] flex items-center justify-center text-white text-[13px] font-medium">
                {testimonials[0].initials}
              </div>
              <div>
                <div className="text-[14px] font-medium text-[var(--color-deep-plum)] tracking-[var(--tracking-body)]">
                  {testimonials[0].author}
                </div>
                <div className="text-[13px] text-[var(--color-slate-text)] tracking-[var(--tracking-body)]">
                  {testimonials[0].role} · {testimonials[0].company}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div
              className="rounded-lg p-6"
              style={{
                background: 'var(--color-action-orange)',
                boxShadow: 'rgba(0,0,0,0.1) 0px 4px 8px 0px, rgba(0,0,0,0.1) 0px 2px 4px 0px',
              }}
            >
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-white/70">
                Quarter result
              </div>
              <div className="text-[48px] font-semibold tracking-[var(--tracking-display)] text-white mt-2 leading-none">
                $1.4M
              </div>
              <div className="text-white/90 text-[14px] mt-3 tracking-[var(--tracking-body)]">
                closed in Q4 after switching off spreadsheets — 31% above forecast.
              </div>
            </div>

            <div className="card-subtle p-5 mt-4">
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)]">
                Time saved per rep
              </div>
              <div className="text-[24px] font-medium tracking-[var(--tracking-heading-sm)] mt-1 text-[var(--color-ink-blue)]">
                ~4.5 hrs / week
              </div>
              <div className="text-[12px] text-[var(--color-slate-text)] mt-1">
                no more pipeline scrubs before 1:1s
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
