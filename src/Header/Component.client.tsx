'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Header } from '@/payload-types'

import { TimHortonsLogo } from '@/components/TimHortonsLogo'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header className="w-full bg-th-red text-white">
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: 'var(--max-w)',
          paddingInline: 'var(--gutter)',
          paddingBlock: '18px',
        }}
      >
        <Link href="/" aria-label="Tim Hortons" className="text-white">
          <TimHortonsLogo height={30} />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
