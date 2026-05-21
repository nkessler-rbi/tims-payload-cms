import React from 'react'

import type { ButtonBlock as ButtonBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

const alignmentClass: Record<NonNullable<ButtonBlockProps['alignment']>, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export const ButtonBlockComponent: React.FC<
  ButtonBlockProps & { locale?: Locale; anchorId?: string | null }
> = ({ label, variant, size, link, alignment, locale, anchorId }) => {
  return (
    <section
      id={anchorId || undefined}
      className="b-button"
      style={{ padding: 'var(--section-y) 0' }}
    >
      <div
        className={cn('mx-auto flex flex-wrap items-center', alignmentClass[alignment ?? 'left'])}
        style={{ maxWidth: 'var(--max-w)', paddingInline: 'var(--gutter)' }}
      >
        <CMSLink
          {...link}
          label={label}
          appearance={variant ?? 'default'}
          size={size ?? 'default'}
          locale={locale}
        />
      </div>
    </section>
  )
}
