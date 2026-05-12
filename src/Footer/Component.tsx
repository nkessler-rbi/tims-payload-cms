import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { TimHortonsLogo } from '@/components/TimHortonsLogo'

const COLUMN_LABELS = ['Programs', 'Company', 'Help']

const chunkIntoColumns = <T,>(items: T[], columns: number): T[][] => {
  if (items.length === 0) return []
  const perColumn = Math.ceil(items.length / columns)
  return Array.from({ length: columns }, (_, i) =>
    items.slice(i * perColumn, (i + 1) * perColumn),
  ).filter((c) => c.length > 0)
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []
  const columns = chunkIntoColumns(navItems, 3)
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-th-espresso text-[#D4C7B7]" style={{ padding: '48px 0 32px' }}>
      <div
        className="mx-auto flex flex-col gap-10"
        style={{ maxWidth: 'var(--max-w)', paddingInline: 'var(--gutter)' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-[280px]">
            <Link href="/" aria-label="Tim Hortons" className="text-[#D4C7B7] inline-block">
              <TimHortonsLogo height={28} />
            </Link>
            <p
              className="mt-4 text-[13px] leading-relaxed"
              style={{ color: '#9D8E7D' }}
            >
              Proudly Canadian, brewing coffee and supporting communities since 1964.
            </p>
          </div>

          {columns.length > 0 && (
            <div className="flex flex-wrap gap-14">
              {columns.map((items, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  <h4
                    className="font-mono uppercase"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      color: '#9D8E7D',
                      margin: 0,
                    }}
                  >
                    {COLUMN_LABELS[colIdx] ?? ''}
                  </h4>
                  <ul className="flex flex-col gap-2 list-none m-0 p-0">
                    {items.map(({ link }, i) => (
                      <li key={i}>
                        <CMSLink
                          {...link}
                          appearance="link"
                          className="text-[#D4C7B7] text-sm hover:text-white transition-colors"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="m-0 text-xs" style={{ color: '#9D8E7D' }}>
            © {year} Tim Hortons. All rights reserved.
          </p>
          <p
            className="m-0 font-mono uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#9D8E7D' }}
          >
            Powered by Payload CMS
          </p>
        </div>
      </div>
    </footer>
  )
}
