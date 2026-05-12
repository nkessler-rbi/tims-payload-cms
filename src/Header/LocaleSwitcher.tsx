'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { LOCALES, DEFAULT_LOCALE, isValidLocale, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

const swapLocaleInPath = (pathname: string, nextLocale: Locale): string => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return `/${nextLocale}`

  if (isValidLocale(segments[0])) {
    segments[0] = nextLocale
  } else {
    segments.unshift(nextLocale)
  }
  return `/${segments.join('/')}`
}

export const LocaleSwitcher: React.FC = () => {
  const pathname = usePathname() || `/${DEFAULT_LOCALE}`
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  const currentLocale: Locale = isValidLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE

  return (
    <div
      className="flex items-center gap-1 text-white font-mono"
      style={{ fontSize: '11px', letterSpacing: '0.05em' }}
      aria-label="Language switcher"
    >
      {LOCALES.map((locale, idx) => {
        const isActive = locale === currentLocale
        return (
          <React.Fragment key={locale}>
            {idx > 0 && <span className="opacity-40">/</span>}
            <Link
              href={swapLocaleInPath(pathname, locale)}
              className={cn(
                'uppercase px-1 transition-opacity',
                isActive ? 'opacity-100 font-bold' : 'opacity-85 hover:opacity-100',
              )}
              aria-current={isActive ? 'true' : undefined}
            >
              {locale}
            </Link>
          </React.Fragment>
        )
      })}
    </div>
  )
}
