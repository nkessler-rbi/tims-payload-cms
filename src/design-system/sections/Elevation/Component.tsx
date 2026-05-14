import React from 'react'

import { Prose } from '@/design-system/prose'
import type { DesignSystem } from '@/design-system/parseDesignMd'

type Layer = { level: number; label: string; description: string; preview: React.ReactNode }

const layers: Layer[] = [
  {
    level: 0,
    label: 'Page background',
    description: 'surface (#ffffff) or neutral (#fbf6ef) for warmer pages',
    preview: (
      <div className="grid h-32 grid-cols-2">
        <div className="bg-white p-4 text-xs text-th-muted">surface</div>
        <div className="bg-th-cream p-4 text-xs text-th-muted">neutral</div>
      </div>
    ),
  },
  {
    level: 1,
    label: 'Card / muted panel',
    description: 'neutral-soft on surface — the cream-on-white contrast is the elevation',
    preview: (
      <div className="bg-white p-4">
        <div className="rounded-[4px] bg-th-cream-soft p-6 text-sm text-th-espresso">
          Card surface
        </div>
      </div>
    ),
  },
  {
    level: 2,
    label: 'Interactive card',
    description: 'neutral-soft + 1px outline border. Optional hover:shadow-md.',
    preview: (
      <div className="bg-white p-4">
        <div className="rounded-[4px] border border-th-rule bg-th-cream-soft p-6 text-sm text-th-espresso">
          Interactive card
        </div>
      </div>
    ),
  },
  {
    level: 3,
    label: 'Inverted (CTA)',
    description: 'primary fill with on-primary text — commands attention without shadow',
    preview: (
      <div className="bg-white p-4">
        <div className="rounded-[4px] bg-th-red p-6 text-sm text-white">CTA panel</div>
      </div>
    ),
  },
]

export const ElevationSection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  return (
    <div className="space-y-8">
      <Prose markdown={design.sections['elevation-depth'] ?? design.sections.elevation ?? ''} />
      <ul className="grid gap-6 sm:grid-cols-2">
        {layers.map((layer) => (
          <li
            key={layer.level}
            className="overflow-hidden rounded-[4px] border border-th-rule bg-card"
          >
            {layer.preview}
            <div className="space-y-1 p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Level {layer.level}
              </p>
              <p className="font-medium text-th-espresso">{layer.label}</p>
              <p className="text-sm text-muted-foreground">{layer.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
