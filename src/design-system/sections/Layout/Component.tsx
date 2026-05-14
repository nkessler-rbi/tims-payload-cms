import React from 'react'

import { Prose } from '@/design-system/prose'
import type { DesignSystem } from '@/design-system/parseDesignMd'

const parseDimensionPx = (value: string): number => {
  const m = value.match(/^(\d+(?:\.\d+)?)\s*px$/)
  if (m) return parseFloat(m[1])
  const r = value.match(/^(\d+(?:\.\d+)?)\s*rem$/)
  if (r) return parseFloat(r[1]) * 16
  return 0
}

export const LayoutSection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  const entries = Object.entries(design.spacing)
  const max = Math.max(...entries.map(([, v]) => parseDimensionPx(v)), 1)
  return (
    <div className="space-y-8">
      <Prose markdown={design.sections['layout-spacing'] ?? design.sections.layout ?? ''} />
      <ul className="space-y-3">
        {entries.map(([name, value]) => {
          const px = parseDimensionPx(value)
          const widthPct = max > 0 ? (px / max) * 100 : 0
          return (
            <li key={name} className="grid items-center gap-4 lg:grid-cols-[200px_1fr_120px]">
              <p className="font-mono text-sm text-th-espresso">{name}</p>
              <div className="h-6 rounded-[4px] bg-th-cream-soft">
                <div
                  className="h-6 rounded-[4px] bg-th-red"
                  style={{ width: `${widthPct}%` }}
                  aria-hidden
                />
              </div>
              <p className="font-mono text-xs text-muted-foreground">{value}</p>
            </li>
          )
        })}
      </ul>

      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Max content width
        </p>
        <div className="relative h-12 rounded-[4px] border border-th-rule bg-th-cream-soft">
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-[4px] bg-white"
            style={{ width: 'min(100%, 1180px)' }}
            aria-hidden
          />
          <p className="absolute inset-0 flex items-center justify-center font-mono text-xs text-th-espresso">
            1180px
          </p>
        </div>
      </div>
    </div>
  )
}
