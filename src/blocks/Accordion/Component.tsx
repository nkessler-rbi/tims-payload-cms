import React from 'react'

import RichText from '@/components/RichText'

export type AccordionBlockProps = {
  heading?: string | null
  items: { question: string; answer: any; id?: string | null }[]
  anchorId?: string | null
}

export const AccordionBlockComponent: React.FC<AccordionBlockProps> = ({
  heading,
  items,
  anchorId,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section
      id={anchorId || undefined}
      className="b-accordion"
      style={{ padding: 'var(--section-y) 0', background: 'var(--background)' }}
    >
      <div
        className="mx-auto grid items-start"
        style={{
          maxWidth: 'var(--max-w)',
          paddingInline: 'var(--gutter)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(32px, 6vw, 96px)',
        }}
      >
        <div className="heading-col">
          {heading && (
            <h2
              className="font-display-bold"
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: 'clamp(30px, 3.6vw, 44px)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: 'var(--th-espresso)',
              }}
            >
              {heading}
            </h2>
          )}
        </div>
        <div
          className="list"
          style={{ borderTop: '1px solid var(--th-rule)' }}
        >
          {items.map((item, idx) => (
            <details
              key={item.id || idx}
              className="acc-item group"
              style={{ borderBottom: '1px solid var(--th-rule)' }}
            >
              <summary
                className="cursor-pointer list-none flex justify-between items-start gap-6 font-display-bold transition-colors"
                style={{
                  padding: '22px 0',
                  fontWeight: 600,
                  fontSize: 'clamp(17px, 1.6vw, 19px)',
                  letterSpacing: '-0.01em',
                  color: 'var(--th-ink)',
                }}
              >
                <span className="flex-1">{item.question}</span>
                <span
                  aria-hidden
                  className="relative inline-block flex-shrink-0 transition-all duration-200 group-hover:border-th-red group-hover:bg-th-red group-open:border-th-red group-open:bg-th-red"
                  style={{
                    width: 28,
                    height: 28,
                    border: '1.5px solid var(--th-ink)',
                    borderRadius: 999,
                    marginTop: 2,
                  }}
                >
                  <span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors group-hover:bg-white group-open:bg-white"
                    style={{
                      width: 12,
                      height: 1.5,
                      background: 'var(--th-ink)',
                    }}
                  />
                  <span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-open:scale-y-0 group-hover:bg-white group-open:bg-white"
                    style={{
                      width: 1.5,
                      height: 12,
                      background: 'var(--th-ink)',
                    }}
                  />
                </span>
              </summary>
              <div
                style={{
                  padding: '0 0 22px',
                  maxWidth: '64ch',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: 'var(--th-espresso-soft)',
                }}
              >
                <RichText data={item.answer} enableGutter={false} enableProse={false} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
