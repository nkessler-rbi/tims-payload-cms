import React from 'react'

import { Prose } from '@/design-system/prose'
import type { DesignSystem, TypographyToken } from '@/design-system/parseDesignMd'

const FONT_FAMILY_CSS: Record<string, string> = {
  'Sofia Pro Black': 'var(--font-display), "Helvetica Neue", Arial, sans-serif',
  'Sofia Pro Bold': 'var(--font-display-bold), "Helvetica Neue", Arial, sans-serif',
  Manrope: 'var(--font-sans), system-ui, sans-serif',
  'JetBrains Mono': 'var(--font-mono), ui-monospace, monospace',
}

const tokenToCss = (token: TypographyToken): React.CSSProperties => ({
  fontFamily: token.fontFamily ? (FONT_FAMILY_CSS[token.fontFamily] ?? token.fontFamily) : undefined,
  fontWeight: token.fontWeight as React.CSSProperties['fontWeight'],
  fontSize: token.fontSize,
  lineHeight: token.lineHeight as React.CSSProperties['lineHeight'],
  letterSpacing: token.letterSpacing,
})

const SAMPLE_TEXT: Record<string, string> = {
  h1: 'Always Fresh.',
  h2: 'A signature blend',
  h3: 'New on the menu',
  'body-md': 'Tim Hortons coffee is brewed at the perfect temperature, always.',
  'body-lg': 'Tim Hortons coffee is brewed at the perfect temperature, always.',
  'label-mono': 'TIMS-PROD-001',
}

export const TypographySection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  return (
    <div className="space-y-8">
      <Prose markdown={design.sections.typography ?? ''} />
      <ul className="divide-y divide-th-rule border-y border-th-rule">
        {Object.entries(design.typography).map(([name, token]) => (
          <li key={name} className="grid gap-4 py-6 lg:grid-cols-[200px_1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {name}
              </p>
              <dl className="mt-2 space-y-0.5 font-mono text-xs text-th-espresso-soft">
                {token.fontFamily && (
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">family</dt>
                    <dd>{token.fontFamily}</dd>
                  </div>
                )}
                {token.fontSize && (
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">size</dt>
                    <dd>{token.fontSize}</dd>
                  </div>
                )}
                {token.fontWeight !== undefined && (
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">weight</dt>
                    <dd>{token.fontWeight}</dd>
                  </div>
                )}
                {token.lineHeight !== undefined && (
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">line-h</dt>
                    <dd>{token.lineHeight}</dd>
                  </div>
                )}
                {token.letterSpacing && (
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">tracking</dt>
                    <dd>{token.letterSpacing}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div style={tokenToCss(token)} className="text-th-espresso">
              {SAMPLE_TEXT[name] ?? 'The quick brown fox jumps over the lazy dog.'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
