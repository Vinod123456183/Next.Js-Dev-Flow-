import localFont from 'next/font/local'

import { ThemeProvider } from '@/context/Theme'

import './globals.css'

import { cn } from '@/lib/utils'

import type { Metadata } from 'next'

import { Geist } from 'next/font/google'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'

import { ReactNode } from 'react'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const inter = localFont({
  src: './fonts/InterVF.ttf',
  variable: '--font-inter',
})

const spaceGrotesk = localFont({
  src: './fonts/SpaceGrotesk-VF.ttf',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Devflow',
  description:
    'A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('font-sans', geist.variable)}
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${inter.variable} ${spaceGrotesk.variable}`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}
export default RootLayout
