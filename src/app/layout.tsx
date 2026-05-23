import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pipeline.io — Sales pipeline, built for closers',
  description: 'Pipeline.io is a sales pipeline built for the people who actually close. Drag opportunities through your stages, see where the money is sitting, and stop losing deals to bad hygiene.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="4" y="4" width="8" height="24" rx="2" fill="%23111a4a"/><rect x="14" y="4" width="8" height="16" rx="2" fill="%23ec652b"/><rect x="24" y="4" width="4" height="10" rx="1" fill="%2388deeb"/></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased font-[family-name:var(--font-inter)] text-[var(--color-ink-blue)] bg-[var(--color-ghost-white)]">
        {children}
      </body>
    </html>
  )
}
