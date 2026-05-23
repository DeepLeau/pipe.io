import Link from 'next/link'
import { pricingPlans } from '@/lib/data'

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-action-orange)]">// Pricing</span>
          <h2 className="text-[40px] leading-[1.1] tracking-[var(--tracking-heading)] font-semibold mt-2 text-[var(--color-ink-blue)]">
            Per seat. No &ldquo;talk to sales&rdquo; tier.
          </h2>
          <p className="mt-3 text-[16px] text-[var(--color-slate-text)]">
            Start free. Pay when your team grows. Cancel any month.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-[1000px] mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="card-subtle p-7 relative"
              style={
                plan.highlighted
                  ? { boxShadow: 'rgba(236,101,43,0.5) 0 0 0 1.5px, rgba(0,0,0,0.06) 0px 8px 24px -8px' }
                  : undefined
              }
            >
              {plan.badge && (
                <div className="absolute -top-3 left-7 bg-[rgba(236,101,43,0.08)] text-[var(--color-action-orange)] border border-[rgba(236,101,43,0.2)] text-[10px] font-[family-name:var(--font-mono)] px-2 py-1 rounded">
                  {plan.badge}
                </div>
              )}
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)]">
                {plan.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-[44px] font-semibold tracking-[var(--tracking-display)] text-[var(--color-ink-blue)]">
                  ${plan.price}
                </span>
                <span className="text-[13px] text-[var(--color-slate-text)]">/ {plan.period}</span>
              </div>
              <p className="text-[13px] text-[var(--color-slate-text)] mt-2 tracking-[var(--tracking-body)]">
                {plan.description}
              </p>

              <Link
                href="/signup"
                className={`w-full inline-flex items-center justify-center gap-2 mt-6 rounded-lg px-[32px] py-[12px] text-[14px] font-medium transition-colors duration-150 ${
                  plan.highlighted
                    ? 'bg-[var(--color-action-orange)] text-white shadow-[rgba(236,101,43,0.25)_0px_1px_2px_0px,rgba(255,255,255,0.25)_0px_1px_0px_0px_inset] hover:bg-[#d8581f]'
                    : 'bg-white/50 text-[var(--color-charcoal-text)] border border-[var(--color-steel-gray)] hover:bg-white'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="mt-6 space-y-2.5 text-[13px] text-[var(--color-charcoal-text)]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--color-success-moss)]">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
