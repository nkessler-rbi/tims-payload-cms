import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { isValidLocale } from '@/utilities/locale'

const ROUTE_TITLE = {
  en: 'Static Pages',
  fr: 'Pages statiques',
}

type Args = {
  params: Promise<{ locale: string }>
}

export default async function StaticPagesCatalogue({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  if (!isValidLocale(localeParam)) notFound()
  const locale = localeParam

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    locale,
    draft,
    overrideAccess: draft,
    pagination: false,
    limit: 100,
    depth: 1,
    sort: '-updatedAt',
  })

  return (
    <main className="container mx-auto py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          {ROUTE_TITLE[locale]}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">
          {locale === 'fr'
            ? 'Toutes les pages de campagnes'
            : 'All campaign landing pages'}
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {locale === 'fr'
            ? 'Catalogue de toutes les pages statiques publiées dans le CMS.'
            : 'A catalogue of every static page currently published in the CMS.'}
        </p>
      </header>

      {docs.length === 0 ? (
        <p className="text-muted-foreground">
          {locale === 'fr'
            ? 'Aucune page n’a encore été publiée. Allez dans /admin pour en créer une.'
            : 'No pages have been published yet. Visit /admin to create one.'}
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((page) => {
            const heroMedia = (page as any).hero?.media
            const metaImage = (page as any).meta?.image
            const cover = heroMedia || metaImage
            const href = `/${locale}/${page.slug}`

            return (
              <li
                key={page.id}
                className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition"
              >
                <Link href={href} className="block">
                  <div className="aspect-video bg-muted overflow-hidden">
                    {cover && typeof cover === 'object' ? (
                      <Media resource={cover} className="w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{page.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">/{page.slug}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam } = await paramsPromise
  if (!isValidLocale(localeParam)) return {}
  return {
    title: ROUTE_TITLE[localeParam],
  }
}
