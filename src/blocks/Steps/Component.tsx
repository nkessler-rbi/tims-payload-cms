import React from 'react'

import type { Locale } from '@/utilities/locale'

type StepItem = {
  title: string
  body?: string | null
}

export type StepsBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  items: StepItem[]
  anchorId?: string | null
  locale?: Locale
}

export const StepsBlockComponent: React.FC<StepsBlockProps> = ({
  eyebrow,
  heading,
  items,
  anchorId,
}) => {
  return (
    <section
      id={anchorId || undefined}
      className="b-steps"
      style={{ padding: 'var(--section-y) 0', background: 'var(--th-cream-soft)' }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 'var(--max-w)', paddingInline: 'var(--gutter)' }}
      >
        {(eyebrow || heading) && (
          <header className="flex flex-col" style={{ gap: 12, marginBottom: 48, maxWidth: '60ch' }}>
            {eyebrow && (
              <p
                className="font-mono uppercase"
                style={{
                  margin: 0,
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  color: 'var(--th-red)',
                }}
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className="font-display-bold"
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--th-espresso)',
                }}
              >
                {heading}
              </h2>
            )}
          </header>
        )}

        <ol
          className="grid"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            counterReset: 'th-step',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(24px, 3vw, 40px)',
          }}
        >
          {items.map((item, i) => (
            <li
              key={i}
              className="relative flex flex-col"
              style={{ gap: 14, counterIncrement: 'th-step' }}
            >
              <div
                className="flex items-center justify-center"
                aria-hidden
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '999px',
                  background: 'var(--th-red)',
                  color: 'white',
                  fontFamily: 'var(--font-display, inherit)',
                  fontWeight: 700,
                  fontSize: '22px',
                  lineHeight: 1,
                }}
              >
                {i + 1}
              </div>
              <h3
                className="font-display-bold"
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: 'clamp(18px, 1.6vw, 22px)',
                  lineHeight: 1.2,
                  color: 'var(--th-espresso)',
                }}
              >
                {item.title}
              </h3>
              {item.body && (
                <p
                  style={{
                    margin: 0,
                    fontSize: '15.5px',
                    lineHeight: 1.6,
                    color: 'var(--th-muted)',
                    maxWidth: '40ch',
                  }}
                >
                  {item.body}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
