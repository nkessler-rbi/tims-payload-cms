import React from 'react'

import { BlockMedia } from '@/blocks/_shared/BlockMedia'
import { CMSLink } from '@/components/Link'
import type { Locale } from '@/utilities/locale'

type Card = {
  image: any
  heading: string
  body?: string | null
  link?: {
    type?: 'custom' | 'reference' | null
    label?: string | null
    url?: string | null
    newTab?: boolean | null
    reference?: any
  } | null
}

export type DoubleImageBlockProps = {
  card1: Card
  card2: Card
  anchorId?: string | null
  locale?: Locale
}

const Card: React.FC<{ card: Card; locale?: Locale }> = ({ card, locale }) => (
  <div className="space-y-4">
    <BlockMedia
      resource={card.image}
      imgClassName="rounded-lg w-full h-auto aspect-video object-cover"
    />
    <h3 className="text-2xl font-semibold">{card.heading}</h3>
    {card.body && <p className="text-muted-foreground">{card.body}</p>}
    {card.link && (card.link.label || card.link.url) && (
      <CMSLink {...card.link} locale={locale} appearance="default" size="lg" />
    )}
  </div>
)

export const DoubleImageBlockComponent: React.FC<DoubleImageBlockProps> = ({
  card1,
  card2,
  anchorId,
  locale,
}) => {
  return (
    <section id={anchorId || undefined} className="container mx-auto py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <Card card={card1} locale={locale} />
        <Card card={card2} locale={locale} />
      </div>
    </section>
  )
}
