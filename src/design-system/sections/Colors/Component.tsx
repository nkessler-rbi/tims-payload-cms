import React from 'react'

import { Prose } from '@/design-system/prose'
import type { DesignSystem } from '@/design-system/parseDesignMd'

const contrastVsWhite = (hex: string): number => {
  const c = hex.replace('#', '')
  if (c.length !== 6) return 0
  const rgb = [0, 2, 4].map((i) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  const l = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  return Math.round(((1 + 0.05) / (l + 0.05)) * 100) / 100
}

const Swatch: React.FC<{ name: string; hex: string }> = ({ name, hex }) => {
  const ratio = contrastVsWhite(hex)
  const showLightText = ratio >= 4.5
  return (
    <li className="overflow-hidden rounded-[4px] border border-th-rule bg-card">
      <div
        className="flex aspect-[3/2] items-end p-4"
        style={{ backgroundColor: hex, color: showLightText ? '#fff' : '#1a120c' }}
      >
        <span className="font-mono text-xs uppercase tracking-widest">{name}</span>
      </div>
      <div className="space-y-1 p-4">
        <p className="font-mono text-sm">{hex}</p>
        <p className="text-xs text-muted-foreground">
          Contrast vs white: <span className="font-mono">{ratio.toFixed(2)}:1</span>{' '}
          {ratio >= 4.5 ? '(AA)' : ratio >= 3 ? '(AA large)' : '(low)'}
        </p>
      </div>
    </li>
  )
}

export const ColorsSection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  return (
    <div className="space-y-8">
      <Prose markdown={design.sections.colors ?? ''} />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(design.colors).map(([name, hex]) => (
          <Swatch key={name} name={name} hex={hex} />
        ))}
      </ul>
    </div>
  )
}
