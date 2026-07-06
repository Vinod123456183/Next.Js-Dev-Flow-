import localFont from 'next/font/local'

import { ThemeProvider } from '@/context/Theme'

import './globals.css'

import { cn } from '@/lib/utils'

import type { Metadata } from 'next'

import Navbar from '@/components/navigation/navbar'

import { Geist } from 'next/font/google'

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('font-sans', geist.variable)}
    >
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
