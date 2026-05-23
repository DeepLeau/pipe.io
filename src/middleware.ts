import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Routes protégées : dashboard + onboarding (onboarding vérifié après signup)
  const PROTECTED_PREFIXES = ['/dashboard', '/onboarding']
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))

  if (!isProtected) {
    return NextResponse.next({ request })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Fail-safe : env vars manquantes → redirect vers /login plutôt que laisser passer
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Middleware] Supabase env vars missing — redirecting to /login')
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url, 302)
  }

  // L'objet response doit être muté par setAll et renvoyé — sinon les cookies
  // rafraîchis sont perdus et l'utilisateur se retrouve déconnecté à la requête
  // suivante.
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set({ name, value, ...options })
        )
        // Mutation de supabaseResponse qui sera la réponse finale du middleware
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // getUser() revalide le token côté serveur — getSession() ne fait que lire
  // le cookie local et peut être spoofé côté client.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // Préserve le chemin original pour rediriger après login via redirectTo
    url.searchParams.set('redirectTo', encodeURIComponent(pathname))
    return NextResponse.redirect(url, 302)
  }

  return supabaseResponse
}

export const config = {
  // Exclut les assets statiques pour éviter que le middleware ne traite
  // chaque image, fichier CSS, etc. (coût innecesaire).
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
