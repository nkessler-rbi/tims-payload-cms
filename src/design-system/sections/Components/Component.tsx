import React from 'react'

import { Button } from '@/components/ui/button'
import { Prose } from '@/design-system/prose'
import type { DesignSystem } from '@/design-system/parseDesignMd'

const TokenTable: React.FC<{ token: Record<string, string> }> = ({ token }) => (
  <dl className="space-y-1 font-mono text-xs">
    {Object.entries(token).map(([prop, value]) => (
      <div key={prop} className="flex gap-3">
        <dt className="w-32 shrink-0 text-muted-foreground">{prop}</dt>
        <dd className="break-all text-th-espresso">{value}</dd>
      </div>
    ))}
  </dl>
)

const ComponentCard: React.FC<{
  title: string
  tokenKey: string
  design: DesignSystem
  children: React.ReactNode
}> = ({ title, tokenKey, design, children }) => {
  const token = design.components[tokenKey]
  return (
    <li className="overflow-hidden rounded-[4px] border border-th-rule bg-card">
      <div className="space-y-1 border-b border-th-rule p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {tokenKey}
        </p>
        <h3 className="text-lg font-medium text-th-espresso">{title}</h3>
      </div>
      <div className="flex min-h-[120px] items-center justify-center bg-white p-8">
        {children}
      </div>
      {token && (
        <div className="border-t border-th-rule bg-th-cream p-4">
          <TokenTable token={token} />
        </div>
      )}
    </li>
  )
}

export const ComponentsSection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  return (
    <div className="space-y-8">
      <Prose markdown={design.sections.components ?? ''} />
      <ul className="grid gap-6 lg:grid-cols-2">
        <ComponentCard title="Primary button" tokenKey="button-primary" design={design}>
          <Button>Order now</Button>
        </ComponentCard>
        <ComponentCard title="Outline button" tokenKey="button-outline" design={design}>
          <Button variant="outline">Learn more</Button>
        </ComponentCard>
        <ComponentCard title="Secondary button" tokenKey="button-secondary" design={design}>
          <Button variant="secondary">Save for later</Button>
        </ComponentCard>
        <ComponentCard title="CTA block" tokenKey="cta-block" design={design}>
          <div className="rounded-[4px] bg-th-red px-8 py-6 text-center text-white">
            <h4
              style={{
                fontFamily: 'var(--font-display-bold)',
                fontWeight: 600,
                fontSize: 28,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              Run on Tims
            </h4>
            <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Order ahead and skip the line.
            </p>
          </div>
        </ComponentCard>
        <ComponentCard title="Card surface" tokenKey="card" design={design}>
          <div className="w-full max-w-sm rounded-[4px] border border-th-rule bg-card p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Drink of the day
            </p>
            <h4 className="mt-1 text-xl font-medium text-th-red-ink">French Vanilla</h4>
            <p className="mt-2 text-sm text-th-espresso-soft">
              Steamed milk and a touch of sweet vanilla.
            </p>
          </div>
        </ComponentCard>
      </ul>
    </div>
  )
}
