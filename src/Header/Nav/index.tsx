'use client'

import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/Header/LocaleSwitcher'
import Link from 'next/link'
import { ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react'

type NavItem = NonNullable<HeaderType['navItems']>[number]

const hasChildren = (item: NavItem): boolean => (item.children?.length ?? 0) > 0

const TopLevelLink: React.FC<{ item: NavItem }> = ({ item }) => {
  if (item.link && (item.link.url || item.link.reference)) {
    return (
      <CMSLink
        {...item.link}
        label={item.label}
        appearance="link"
        className="text-white text-sm font-semibold hover:opacity-90 transition-opacity"
      />
    )
  }
  return <span className="text-white text-sm font-semibold">{item.label}</span>
}

const Dropdown: React.FC<{ item: NavItem }> = ({ item }) => {
  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center gap-1 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        aria-haspopup="menu"
      >
        {item.label}
        <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden />
      </button>
      <div
        role="menu"
        className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-opacity z-50"
      >
        <ul
          className="min-w-[240px] rounded-md border border-th-rule bg-white py-2 shadow-lg m-0 list-none p-0"
          style={{ color: 'var(--th-espresso)' }}
        >
          {item.children?.map(({ link }, idx) => (
            <li key={idx}>
              <CMSLink
                {...link}
                appearance="link"
                className="block px-4 py-2 text-sm font-medium hover:bg-th-cream-soft hover:text-th-red transition-colors"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const DesktopNav: React.FC<{ navItems: NavItem[] }> = ({ navItems }) => (
  <ul className="hidden md:flex items-center gap-7 m-0 p-0 list-none">
    {navItems.map((item, i) => (
      <li key={i}>{hasChildren(item) ? <Dropdown item={item} /> : <TopLevelLink item={item} />}</li>
    ))}
  </ul>
)

const MobileDrawer: React.FC<{ navItems: NavItem[]; open: boolean; onClose: () => void }> = ({
  navItems,
  open,
  onClose,
}) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="md:hidden fixed inset-0 z-[60]">
      <div
        aria-hidden
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-label="Site menu"
        className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white overflow-y-auto"
        style={{ color: 'var(--th-espresso)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-th-rule">
          <span className="font-display-bold text-lg">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-th-cream-soft"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="px-2 py-3">
          <ul className="m-0 list-none p-0 flex flex-col">
            {navItems.map((item, i) => (
              <li key={i} className="border-b border-th-rule last:border-b-0">
                <div className="px-3 py-3">
                  {item.link && (item.link.url || item.link.reference) ? (
                    <CMSLink
                      {...item.link}
                      label={item.label}
                      appearance="link"
                      className="block text-base font-semibold hover:text-th-red"
                    />
                  ) : (
                    <span className="block text-base font-semibold">{item.label}</span>
                  )}
                </div>
                {hasChildren(item) && (
                  <ul className="m-0 list-none p-0 pl-3 pb-2">
                    {item.children?.map(({ link }, idx) => (
                      <li key={idx}>
                        <CMSLink
                          {...link}
                          appearance="link"
                          className="block px-3 py-2 text-sm text-th-muted hover:text-th-red"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems || []) as NavItem[]
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="flex items-center gap-4 md:gap-7">
      <DesktopNav navItems={navItems} />
      <LocaleSwitcher />
      <Link
        href="/search"
        aria-label="Search"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/12 hover:border-white"
      >
        <SearchIcon className="h-4 w-4" />
      </Link>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white hover:bg-white/12"
      >
        <MenuIcon className="h-4 w-4" />
      </button>
      <MobileDrawer navItems={navItems} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </nav>
  )
}
