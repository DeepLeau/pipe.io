export const dynamic = 'force-dynamic'

import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'

export default function LoginPage() {
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
            <h1 className="text-base font-semibold text-[var(--text-1)]">Sign in</h1>
            <p className="text-sm text-[var(--text-3)] mt-1">
              Enter your credentials to access your account
            </p>
          </div>

          <LoginForm />

          <div className="mt-4 text-center">
            <p className="text-sm text-[var(--text-3)]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[var(--accent-hi)] hover:underline font-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
