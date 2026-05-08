import React from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'

type MediaValue = MediaDoc | number | string | null | undefined

type Props = {
  /**
   * Either a populated Media doc, a media id (number), or a string URL
   * (the latter is used for block library sample data).
   */
  resource: MediaValue
  alt?: string
  className?: string
  imgClassName?: string
}

/**
 * Renders a Payload Media doc, OR a plain image URL string (useful for
 * block library sample data where we have no media collection ids).
 */
export const BlockMedia: React.FC<Props> = ({ resource, alt, className, imgClassName }) => {
  if (!resource) return null

  if (typeof resource === 'string') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={resource} alt={alt || ''} className={imgClassName || className} />
  }

  return <Media resource={resource} alt={alt} className={className} imgClassName={imgClassName} />
}
