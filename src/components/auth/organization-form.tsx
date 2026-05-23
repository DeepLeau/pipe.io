'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function OrganizationForm() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setStatus('loading')
    setErrorMsg(null)

    const supabase = createClient()
    if (!supabase) {
      setStatus('error')
      setErrorMsg('Service unavailable')
      return
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      router.push('/login')
      return
    }

    // Generate slug from name
    const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    // Insert organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: name.trim(), slug })
      .select()
      .single()

    if (orgError) {
      setStatus('error')
      setErrorMsg(orgError.message)
      return
    }

    // Insert membership
    const { error: memberError } = await supabase
      .from('org_members')
      .insert({ org_id: org.id, user_id: user.id, role: 'owner' })

    if (memberError) {
      setStatus('error')
      setErrorMsg(memberError.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[var(--text-2)]">Organization name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Acme Corp"
          required
          autoComplete="organization"
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

      {status === 'error' && errorMsg && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--red)]/10 border border-[var(--red)]/20">
          <AlertCircle size={14} className="text-[var(--red)] shrink-0" />
          <p className="text-xs text-[var(--red)]">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !name.trim()}
        className="h-9 px-4 flex items-center justify-center gap-2 rounded-md
                   bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white text-sm font-medium
                   transition-colors duration-150
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={14} className="animate-spin shrink-0" />
            <span>Creating...</span>
          </>
        ) : (
          <span>Create my organization</span>
        )}
      </button>
    </form>
  )
}
