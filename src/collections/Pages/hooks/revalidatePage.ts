import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

const LOCALES = ['en', 'fr'] as const

const pathsForSlug = (slug: string | undefined | null): string[] => {
  if (!slug) return []
  if (slug === 'home') return ['/', ...LOCALES.map((l) => `/${l}`)]
  return LOCALES.map((l) => `/${l}/${slug}`)
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      for (const path of pathsForSlug(doc.slug)) {
        payload.logger.info(`Revalidating page at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('pages-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      for (const path of pathsForSlug(previousDoc.slug)) {
        payload.logger.info(`Revalidating old page at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('pages-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    for (const path of pathsForSlug(doc?.slug)) {
      revalidatePath(path)
    }
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}
