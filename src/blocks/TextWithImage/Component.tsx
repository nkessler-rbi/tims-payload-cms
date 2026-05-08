import React from 'react'

import { BlockMedia } from '@/blocks/_shared/BlockMedia'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

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
  return (
    <section id={anchorId || undefined} className="container mx-auto py-12">
      <div
        className={cn(
          'grid gap-8 md:gap-12 items-center md:grid-cols-2',
          mediaPosition === 'left' && 'md:[&>*:first-child]:order-2',
        )}
      >
        <div className="space-y-6">
          {richText && <RichText data={richText} enableGutter={false} />}
          {enableCta && link && (
            <CMSLink
              {...link}
              locale={locale}
              appearance={link.appearance || 'default'}
              size="lg"
            />
          )}
        </div>
        <div>
          <BlockMedia resource={media} imgClassName="rounded-lg w-full h-auto" />
        </div>
      </div>
    </section>
  )
}
