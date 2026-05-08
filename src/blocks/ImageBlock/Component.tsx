import React from 'react'

import { BlockMedia } from '@/blocks/_shared/BlockMedia'

export type ImageBlockProps = {
  media: any
  caption?: string | null
  altOverride?: string | null
  anchorId?: string | null
}

export const ImageBlockComponent: React.FC<ImageBlockProps> = ({
  media,
  caption,
  altOverride,
  anchorId,
}) => {
  return (
    <figure id={anchorId || undefined} className="container mx-auto py-8">
      <BlockMedia
        resource={media}
        alt={altOverride || ''}
        imgClassName="rounded-lg w-full h-auto"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
