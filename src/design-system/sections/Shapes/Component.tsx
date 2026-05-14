import React from 'react'

import { Prose } from '@/design-system/prose'
import type { DesignSystem } from '@/design-system/parseDesignMd'

export const ShapesSection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  return (
    <div className="space-y-8">
      <Prose markdown={design.sections.shapes ?? ''} />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(design.rounded).map(([name, value]) => (
          <li
            key={name}
            className="overflow-hidden border border-th-rule bg-card p-4 text-center"
            style={{ borderRadius: value }}
          >
            <div
              className="mx-auto h-20 w-full bg-th-red"
              style={{ borderRadius: value }}
              aria-hidden
            />
            <p className="mt-3 font-mono text-sm">{name}</p>
            <p className="font-mono text-xs text-muted-foreground">{value}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
