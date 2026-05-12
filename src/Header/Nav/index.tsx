'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/Header/LocaleSwitcher'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-7">
      <ul className="hidden md:flex items-center gap-7 m-0 p-0 list-none">
        {navItems.map(({ link }, i) => (
          <li key={i}>
            <CMSLink
              {...link}
              appearance="link"
              className="text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            />
          </li>
        ))}
      </ul>
      <LocaleSwitcher />
      <Link
        href="/search"
        aria-label="Search"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/12 hover:border-white"
      >
        <SearchIcon className="h-4 w-4" />
      </Link>
    </nav>
  )
}
