import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { Locale } from '@/utilities/locale'

export const CallToActionBlock: React.FC<
  CTABlockProps & { locale?: Locale; anchorId?: string | null }
> = ({ links, richText, locale, anchorId }) => {
  return (
    <section
      id={anchorId || undefined}
      className="b-cta"
      style={{ padding: '0 0 var(--section-y)' }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 'var(--max-w)', paddingInline: 'var(--gutter)' }}
      >
        <div
          className="relative overflow-hidden text-white"
          style={{
            background: 'var(--th-red)',
            borderRadius: 'var(--th-radius)',
            padding: 'clamp(36px, 5vw, 64px)',
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 320,
              height: 320,
              top: -100,
              right: -100,
              background: 'rgba(255,255,255,0.06)',
            }}
          />
          <div
            className="relative grid items-center"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(28px, 4vw, 48px)',
            }}
          >
            <div className="b-cta-text">
              {richText && (
                <RichText data={richText} enableGutter={false} enableProse={false} />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              {(links || []).map(({ link }, i) => (
                <CMSLink
                  key={i}
                  size="lg"
                  {...link}
                  locale={locale}
                  className="bg-white !text-th-red hover:!bg-th-ink hover:!text-white transition-colors"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
