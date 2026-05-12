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

const MapleLeaf: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width={28}
    height={32}
    viewBox="0 0 28 32"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M14 0l1.6 5.6 4.8-3.2-1.6 6.4 6.4-1.6-4 4.8 6.8 1.6-5.2 3.2 4.8 4-7.6-.4 1.2 4.4-4.4-2 .4 6.4L14 26l-3.2 3.2.4-6.4-4.4 2 1.2-4.4-7.6.4 4.8-4-5.2-3.2 6.8-1.6-4-4.8 6.4 1.6-1.6-6.4 4.8 3.2L14 0z" />
  </svg>
)

const hasImage = (image: any): boolean => {
  if (image == null) return false
  if (typeof image === 'string') return image.trim().length > 0
  if (typeof image === 'number') return true
  if (typeof image === 'object') {
    return Boolean(image.url || image.filename || image.id)
  }
  return false
}

const CommitmentPanel: React.FC<{ heading: string }> = ({ heading }) => (
  <div
    className="di-commitment flex flex-col justify-between bg-th-cream-soft"
    style={{
      borderRadius: 'var(--th-radius)',
      padding: 'clamp(28px, 4vw, 56px)',
      aspectRatio: '4 / 3',
    }}
  >
    <MapleLeaf className="text-th-red" />
    <h2
      className="font-display-bold"
      style={{
        margin: 0,
        fontWeight: 600,
        fontSize: 'clamp(36px, 4.5vw, 56px)',
        lineHeight: 1,
        letterSpacing: '-0.03em',
        color: 'var(--th-red-ink)',
        maxWidth: '11ch',
      }}
    >
      {heading}
    </h2>
  </div>
)

const ImageCard: React.FC<{ card: Card }> = ({ card }) => (
  <div
    className="relative overflow-hidden"
    style={{
      aspectRatio: '4 / 3',
      borderRadius: 'var(--th-radius)',
      background: 'var(--th-cream-soft)',
    }}
  >
    <BlockMedia
      resource={card.image}
      imgClassName="absolute inset-0 w-full h-full object-cover"
    />
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55) 100%)',
      }}
    />
    <span
      className="absolute font-display-bold text-white whitespace-nowrap"
      style={{
        left: 24,
        bottom: 22,
        fontWeight: 600,
        fontSize: 'clamp(26px, 3vw, 40px)',
        textShadow: '0 2px 14px rgba(0,0,0,0.3)',
      }}
    >
      {card.heading}
    </span>
  </div>
)

const CardBlock: React.FC<{ card: Card; locale?: Locale; showHeadingBelow: boolean }> = ({
  card,
  locale,
  showHeadingBelow,
}) => {
  const cardHasImage = hasImage(card.image)
  return (
    <div className="flex flex-col" style={{ gap: 20 }}>
      {cardHasImage ? <ImageCard card={card} /> : <CommitmentPanel heading={card.heading} />}
      {showHeadingBelow && cardHasImage && (
        <h3
          className="font-display-bold"
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: 'clamp(22px, 2.2vw, 28px)',
            lineHeight: 1.15,
            color: 'var(--th-espresso)',
          }}
        >
          {card.heading}
        </h3>
      )}
      {card.body && (
        <p
          style={{
            margin: 0,
            fontSize: '15.5px',
            lineHeight: 1.6,
            color: 'var(--th-muted)',
            maxWidth: '46ch',
          }}
        >
          {card.body}
        </p>
      )}
      {card.link && (card.link.label || card.link.url) && (
        <div>
          <CMSLink {...card.link} locale={locale} appearance="default" size="lg" />
        </div>
      )}
    </div>
  )
}

export const DoubleImageBlockComponent: React.FC<DoubleImageBlockProps> = ({
  card1,
  card2,
  anchorId,
  locale,
}) => {
  return (
    <section
      id={anchorId || undefined}
      className="b-doubleimage"
      style={{ padding: 'var(--section-y) 0', background: 'var(--background)' }}
    >
      <div
        className="mx-auto grid"
        style={{
          maxWidth: 'var(--max-w)',
          paddingInline: 'var(--gutter)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(20px, 3vw, 40px)',
        }}
      >
        <CardBlock card={card1} locale={locale} showHeadingBelow />
        <CardBlock card={card2} locale={locale} showHeadingBelow />
      </div>
    </section>
  )
}
