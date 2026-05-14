import React from 'react'

import { BlockMedia } from '@/blocks/_shared/BlockMedia'
import { CMSLink } from '@/components/Link'
import type { Locale } from '@/utilities/locale'

type LinkItem = {
  link?: {
    type?: 'custom' | 'reference' | null
    label?: string | null
    url?: string | null
    newTab?: boolean | null
    appearance?: 'default' | 'outline' | null
    reference?: any
  } | null
}

export type HeroBannerBlockProps = {
  backgroundImage: any
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  alignment?: 'left' | 'center' | null
  links?: LinkItem[] | null
  anchorId?: string | null
  locale?: Locale
}

export const HeroBannerBlockComponent: React.FC<HeroBannerBlockProps> = ({
  backgroundImage,
  eyebrow,
  title,
  subtitle,
  alignment = 'left',
  links,
  anchorId,
  locale,
}) => {
  const isCenter = alignment === 'center'

  return (
    <section
      id={anchorId || undefined}
      className="b-herobanner relative overflow-hidden"
      style={{
        minHeight: 'clamp(420px, 60vh, 640px)',
        background: 'var(--th-espresso)',
      }}
    >
      <div className="absolute inset-0">
        <BlockMedia
          resource={backgroundImage}
          imgClassName="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: isCenter
              ? 'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 100%)'
              : 'linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%)',
          }}
        />
      </div>

      <div
        className="relative mx-auto flex h-full items-center"
        style={{
          maxWidth: 'var(--max-w)',
          paddingInline: 'var(--gutter)',
          paddingBlock: 'clamp(72px, 10vw, 120px)',
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: 20,
            maxWidth: isCenter ? '760px' : '620px',
            marginInline: isCenter ? 'auto' : undefined,
            textAlign: isCenter ? 'center' : 'left',
            color: 'white',
          }}
        >
          {eyebrow && (
            <p
              className="font-mono uppercase"
              style={{
                margin: 0,
                fontSize: '12px',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="font-display"
            style={{
              margin: 0,
              fontWeight: 900,
              fontSize: 'clamp(40px, 6.5vw, 80px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 24px rgba(0,0,0,0.25)',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                margin: 0,
                fontSize: '18px',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.92)',
                maxWidth: '52ch',
                marginInline: isCenter ? 'auto' : undefined,
              }}
            >
              {subtitle}
            </p>
          )}
          {links && links.length > 0 && (
            <div
              className="flex flex-wrap items-center"
              style={{
                gap: 12,
                marginTop: 8,
                justifyContent: isCenter ? 'center' : 'flex-start',
              }}
            >
              {links.map(({ link }, i) =>
                link ? (
                  <CMSLink
                    key={i}
                    {...link}
                    locale={locale}
                    size="lg"
                    appearance={link.appearance || 'default'}
                  />
                ) : null,
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
