import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import localFont from 'next/font/local'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import React from 'react'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const sofiaProBold = localFont({
  src: [
    { path: '../../../public/fonts/sofia_pro_bold.woff2', weight: '700', style: 'normal' },
    { path: '../../../public/fonts/sofia_pro_bold.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-display-bold',
  display: 'swap',
})

const sofiaProBlack = localFont({
  src: [
    { path: '../../../public/fonts/sofia_pro_black.woff2', weight: '900', style: 'normal' },
    { path: '../../../public/fonts/sofia_pro_black.woff', weight: '900', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
})

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(
        manrope.variable,
        jetbrainsMono.variable,
        sofiaProBold.variable,
        sofiaProBlack.variable,
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
