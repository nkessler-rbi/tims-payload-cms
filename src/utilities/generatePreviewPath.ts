import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'
import { DEFAULT_LOCALE, isValidLocale } from './locale'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedSlug = encodeURIComponent(slug)

  // Pages are localized; include the locale prefix so live preview hits the right route.
  let localePrefix = ''
  if (collection === 'pages') {
    const locale = req?.locale && isValidLocale(req.locale) ? req.locale : DEFAULT_LOCALE
    localePrefix = `/${locale}`
  }

  const encodedParams = new URLSearchParams({
    path: `${localePrefix}${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
