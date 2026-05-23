export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OrganizationForm } from '@/components/auth/organization-form'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user already has an organization
  const { data: membership } = await supabase
    .from('org_members')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (membership) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <span className="text-base font-semibold text-[var(--text-1)] tracking-tight">
            Pipeline<span className="text-[var(--accent)]">.io</span>
          </span>
        </div>

        <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-6">
          <div className="mb-6">
            <h1 className="text-base font-semibold text-[var(--text-1)]">Create your organization</h1>
            <p className="text-sm text-[var(--text-3)] mt-1">
              An organization is your team&apos;s workspace
            </p>
          </div>

          <OrganizationForm />
        </div>
      </div>
    </div>
  )
}
