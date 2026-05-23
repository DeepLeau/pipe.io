import { workflowSteps } from '@/lib/data'

export default function WorkflowSection() {
  return (
    <section className="relative" style={{ background: 'var(--color-fog-gray)' }}>
      <div className="absolute inset-0 dotted-grid-faint opacity-40 pointer-events-none" />
      <div className="relative max-w-[1200px] mx-auto px-6 py-24">
        <div className="max-w-[700px] mb-14">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-action-orange)]">// Day one</span>
          <h2 className="text-[40px] leading-[1.1] tracking-[var(--tracking-heading)] font-semibold mt-2 text-[var(--color-ink-blue)]">
            From sign-up to forecast in under an hour.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {workflowSteps.map((step) => (
            <div key={step.step} className="card-subtle p-6">
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-slate-text)]">
                Step {step.step}
              </div>
              <h3 className="text-[20px] font-medium mt-3 tracking-[var(--tracking-subheading)] text-[var(--color-ink-blue)]">
                {step.title}
              </h3>
              <p className="text-[14px] text-[var(--color-slate-text)] mt-2 tracking-[var(--tracking-body)]">
                {step.description}
              </p>

              {step.code && (
                <div className="mt-5 font-[family-name:var(--font-mono)] text-[11px] bg-[var(--color-fog-gray)] border border-[var(--color-steel-gray)] rounded p-3 text-[var(--color-charcoal-text)]">
                  <span className="text-[var(--color-callout-cyan)]">→</span> {step.code.split('\n')[0]}
                  <br />
                  <span className="text-[var(--color-slate-text)]">  {step.code.split('\n')[1]}</span>
                </div>
              )}

              {step.stages && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {step.stages.map((stage, i) => {
                    const colors = ['plum', 'plum', 'orange', 'moss']
                    const styles = {
                      plum: 'bg-[rgba(17,26,74,0.05)] text-[var(--color-deep-plum)] border border-[rgba(17,26,74,0.12)]',
                      orange: 'bg-[rgba(236,101,43,0.08)] text-[var(--color-action-orange)] border border-[rgba(236,101,43,0.2)]',
                      moss: 'bg-[rgba(68,180,139,0.08)] text-[var(--color-success-moss)] border border-[rgba(68,180,139,0.2)]',
                    }
                    return (
                      <span key={i} className={`text-[10px] font-[family-name:var(--font-mono)] px-2 py-1 rounded ${styles[colors[i] as keyof typeof styles]}`}>
                        {stage}
                      </span>
                    )
                  })}
                </div>
              )}

              {step.avatars && (
                <div className="mt-5 flex -space-x-2">
                  {step.avatars.map((avatar, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium border-2 border-white ${
                        avatar === '+3'
                          ? 'bg-[var(--color-fog-gray)] text-[var(--color-slate-text)] border-dashed'
                          : i === 0
                          ? 'bg-[var(--color-deep-plum)] text-white'
                          : i === 1
                          ? 'bg-[var(--color-action-orange)] text-white'
                          : 'bg-[var(--color-callout-cyan)] text-white'
                      }`}
                    >
                      {avatar}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
