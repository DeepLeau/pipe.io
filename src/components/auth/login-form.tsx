'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) return

    setStatus('loading')
    setErrorMsg(null)

    const supabase = createClient()
    if (!supabase) {
      setStatus('error')
      setErrorMsg('Service unavailable')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Email field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[var(--text-2)]">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          autoComplete="email"
          className={cn(
            'h-9 px-3 rounded-md text-sm transition-colors duration-150',
            'bg-[var(--surface-1)] border text-[var(--text-1)] placeholder:text-[var(--text-3)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/15',
            status === 'error'
              ? 'border-[var(--red)] focus:border-[var(--red)]'
              : 'border-[var(--border-md)] focus:border-[var(--accent)]/60'
          )}
        />
      </div>

      {/* Password field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[var(--text-2)]">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          className={cn(
            'h-9 px-3 rounded-md text-sm transition-colors duration-150',
            'bg-[var(--surface-1)] border text-[var(--text-1)] placeholder:text-[var(--text-3)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/15',
            status === 'error'
              ? 'border-[var(--red)] focus:border-[var(--red)]'
              : 'border-[var(--border-md)] focus:border-[var(--accent)]/60'
          )}
        />
      </div>

      {/* Error message */}
      {status === 'error' && errorMsg && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--red)]/10 border border-[var(--red)]/20">
          <AlertCircle size={14} className="text-[var(--red)] shrink-0" />
          <p className="text-xs text-[var(--red)]">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || !email.trim() || !password}
        className="h-9 px-4 flex items-center justify-center gap-2 rounded-md
                   bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white text-sm font-medium
                   transition-colors duration-150
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={14} className="animate-spin shrink-0" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign in</span>
        )}
      </button>
    </form>
  )
}
