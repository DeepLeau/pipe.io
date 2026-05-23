export const dynamic = 'force-dynamic'

import { SignupForm } from '@/components/auth/signup-form'
import Link from 'next/link'

export default function SignupPage() {
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
            <h1 className="text-base font-semibold text-[var(--text-1)]">Create your account</h1>
            <p className="text-sm text-[var(--text-3)] mt-1">
              Start your free sales pipeline today
            </p>
          </div>

          <SignupForm />

          <div className="mt-4 text-center">
            <p className="text-sm text-[var(--text-3)]">
              Already have an account?{' '}
              <Link href="/login" className="text-[var(--accent-hi)] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
