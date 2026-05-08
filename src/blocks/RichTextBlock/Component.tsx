import React from 'react'

import RichText from '@/components/RichText'

export type RichTextBlockProps = {
  richText: any
  anchorId?: string | null
}

export const RichTextBlockComponent: React.FC<RichTextBlockProps> = ({ richText, anchorId }) => {
  return (
    <section id={anchorId || undefined} className="py-8">
      <RichText data={richText} />
    </section>
  )
}
