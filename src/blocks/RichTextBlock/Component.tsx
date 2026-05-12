import React from 'react'

import RichText from '@/components/RichText'

export type RichTextBlockProps = {
  richText: any
  anchorId?: string | null
}

export const RichTextBlockComponent: React.FC<RichTextBlockProps> = ({ richText, anchorId }) => {
  return (
    <section
      id={anchorId || undefined}
      className="b-richtext"
      style={{ padding: 'var(--section-y) 0', background: 'var(--background)' }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 'var(--max-w)', paddingInline: 'var(--gutter)' }}
      >
        <RichText data={richText} enableGutter={false} enableProse={false} />
      </div>
    </section>
  )
}
