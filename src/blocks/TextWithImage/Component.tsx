import React from 'react'

import { BlockMedia } from '@/blocks/_shared/BlockMedia'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { Locale } from '@/utilities/locale'

export type TextWithImageBlockProps = {
  mediaPosition: 'left' | 'right'
  richText: any
  media: any
  enableCta?: boolean | null
  link?: {
    type?: 'custom' | 'reference' | null
    label?: string | null
    url?: string | null
    newTab?: boolean | null
    appearance?: 'default' | 'outline' | null
    reference?: any
  } | null
  anchorId?: string | null
  /** Provided by RenderBlocks for resolving reference links. */
  locale?: Locale
}

export const TextWithImageBlockComponent: React.FC<TextWithImageBlockProps> = ({
  mediaPosition = 'right',
  richText,
  media,
  enableCta,
  link,
  anchorId,
  locale,
}) => {
  const isMediaLeft = mediaPosition === 'left'

  const textCol = (
    <div className="flex flex-col gap-6 b-richtext">
      {richText && <RichText data={richText} enableGutter={false} enableProse={false} />}
      {enableCta && link && (
        <div>
          <CMSLink
            {...link}
            locale={locale}
            appearance={link.appearance || 'default'}
            size="lg"
          />
        </div>
      )}
    </div>
  )

  const mediaCol = (
    <div
      className="relative overflow-hidden bg-th-cream-soft"
      style={{ aspectRatio: '5 / 4', borderRadius: '12px' }}
    >
      <BlockMedia
        resource={media}
        imgClassName="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )

  return (
    <section
      id={anchorId || undefined}
      className="b-feature"
      style={{ padding: 'var(--section-y) 0', background: 'var(--background)' }}
    >
      <div
        className="mx-auto grid items-center"
        style={{
          maxWidth: 'var(--max-w)',
          paddingInline: 'var(--gutter)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(28px, 5vw, 80px)',
        }}
      >
        {isMediaLeft ? mediaCol : textCol}
        {isMediaLeft ? textCol : mediaCol}
      </div>
    </section>
  )
}
