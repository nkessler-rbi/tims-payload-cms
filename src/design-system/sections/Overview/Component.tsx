import React from 'react'

import { Prose } from '@/design-system/prose'
import type { DesignSystem } from '@/design-system/parseDesignMd'

export const OverviewSection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  return (
    <div className="space-y-8">
      <div className="rounded-[4px] border border-th-rule bg-th-cream p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-th-muted">Brand</p>
        <h2
          className="mt-2 font-[var(--font-display)] text-5xl text-th-espresso"
          style={{ fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          {design.name}
        </h2>
        {design.description && (
          <p className="mt-4 max-w-2xl text-th-espresso-soft">{design.description}</p>
        )}
      </div>
      <Prose markdown={design.sections.overview ?? ''} />
    </div>
  )
}
