import React from 'react'

import { BlockMedia } from '@/blocks/_shared/BlockMedia'
import { CMSLink } from '@/components/Link'
import type { Locale } from '@/utilities/locale'

type CardItem = {
  image?: any
  heading: string
  body?: string | null
  enableCta?: boolean | null
  link?: {
    type?: 'custom' | 'reference' | null
    label?: string | null
    url?: string | null
    newTab?: boolean | null
    reference?: any
  } | null
}

export type CardGridBlockProps = {
  heading?: string | null
  description?: string | null
  columns?: '2' | '3' | '4' | null
  items: CardItem[]
  anchorId?: string | null
  locale?: Locale
}

const minColWidth: Record<'2' | '3' | '4', string> = {
  '2': '320px',
  '3': '260px',
  '4': '220px',
}

const hasImage = (image: any): boolean => {
  if (image == null) return false
  if (typeof image === 'string') return image.trim().length > 0
  if (typeof image === 'number') return true
  if (typeof image === 'object') return Boolean(image.url || image.filename || image.id)
  return false
}

export const CardGridBlockComponent: React.FC<CardGridBlockProps> = ({
  heading,
  description,
  columns = '3',
  items,
  anchorId,
  locale,
}) => {
  const colKey = (columns || '3') as '2' | '3' | '4'

  return (
    <section
      id={anchorId || undefined}
      className="b-cardgrid"
      style={{ padding: 'var(--section-y) 0', background: 'var(--background)' }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 'var(--max-w)', paddingInline: 'var(--gutter)' }}
      >
        {(heading || description) && (
          <header className="flex flex-col" style={{ gap: 12, marginBottom: 40, maxWidth: '60ch' }}>
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
            {description && (
              <p
                style={{
                  margin: 0,
                  fontSize: '17px',
                  lineHeight: 1.6,
                  color: 'var(--th-muted)',
                }}
              >
                {description}
              </p>
            )}
          </header>
        )}

        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColWidth[colKey]}), 1fr))`,
            gap: 'clamp(20px, 2.5vw, 32px)',
          }}
        >
          {items.map((item, i) => {
            const showImage = hasImage(item.image)
            return (
              <article
                key={i}
                className="flex flex-col"
                style={{
                  background: 'var(--background)',
                  border: '1px solid var(--th-rule)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                {showImage && (
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '4 / 3', background: 'var(--th-cream-soft)' }}
                  >
                    <BlockMedia
                      resource={item.image}
                      imgClassName="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col" style={{ gap: 12, padding: 'clamp(20px, 2vw, 28px)' }}>
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
                    {item.heading}
                  </h3>
                  {item.body && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: '15px',
                        lineHeight: 1.6,
                        color: 'var(--th-muted)',
                      }}
                    >
                      {item.body}
                    </p>
                  )}
                  {item.enableCta && item.link && (item.link.label || item.link.url) && (
                    <div style={{ marginTop: 'auto', paddingTop: 4 }}>
                      <CMSLink
                        {...item.link}
                        locale={locale}
                        appearance="link"
                        className="text-th-red font-semibold hover:underline"
                      />
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
