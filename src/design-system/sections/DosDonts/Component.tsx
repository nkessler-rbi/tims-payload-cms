import React from 'react'

import type { DesignSystem } from '@/design-system/parseDesignMd'

/**
 * Split the prose body into separate Do / Don't items by parsing bullet lines
 * and tagging each item by the first bold marker ("Do" or "Don't").
 */
const parseItems = (md: string): { kind: 'do' | 'dont'; text: string }[] => {
  const items: { kind: 'do' | 'dont'; text: string }[] = []
  for (const raw of md.split('\n')) {
    const m = raw.match(/^\s*-\s+\*\*(.+?)\*\*\s+(.*)$/)
    if (!m) continue
    const tag = m[1].toLowerCase()
    const kind: 'do' | 'dont' = tag.startsWith("don") ? 'dont' : 'do'
    items.push({ kind, text: m[2] })
  }
  return items
}

export const DosDontsSection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  const items = parseItems(design.sections['dos-and-donts'] ?? '')
  const dos = items.filter((i) => i.kind === 'do')
  const donts = items.filter((i) => i.kind === 'dont')

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[4px] border border-th-rule bg-th-cream p-6">
        <h3 className="font-mono text-xs uppercase tracking-widest text-th-red">Do</h3>
        <ul className="mt-4 space-y-3 text-sm text-th-espresso">
          {dos.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-th-red" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[4px] border border-th-rule bg-th-cream p-6">
        <h3 className="font-mono text-xs uppercase tracking-widest text-th-muted">Don&rsquo;t</h3>
        <ul className="mt-4 space-y-3 text-sm text-th-espresso">
          {donts.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden
                className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full border border-th-muted"
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
