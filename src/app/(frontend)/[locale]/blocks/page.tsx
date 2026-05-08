import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { blockRegistry, toLibrarySlug } from '@/blocks/registry'
import { isValidLocale } from '@/utilities/locale'

const ROUTE_TITLE = {
  en: 'Block Library',
  fr: 'Bibliothèque de blocs',
}

type Args = {
  params: Promise<{ locale: string }>
}

export default async function BlockLibrary({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  if (!isValidLocale(localeParam)) notFound()
  const locale = localeParam

  return (
    <main className="container mx-auto py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          {ROUTE_TITLE[locale]}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">
          {locale === 'fr' ? 'Tous les blocs disponibles' : 'All available blocks'}
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {locale === 'fr'
            ? 'Chaque bloc enregistré dans le CMS est répertorié ici, avec un aperçu en direct et la liste de ses champs.'
            : 'Every block registered in the CMS appears here, with a live preview and its field schema.'}
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blockRegistry.map((entry) => {
          const urlSlug = toLibrarySlug(entry.block.slug)
          const href = `/${locale}/blocks/${urlSlug}`
          const fieldCount = (entry.block.fields || []).length

          return (
            <li
              key={entry.block.slug}
              className="border border-border rounded-lg p-5 bg-card hover:shadow-md transition"
            >
              <Link href={href} className="block">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {entry.block.slug}
                </p>
                <h2 className="text-xl font-semibold mt-1">{entry.label}</h2>
                <p className="text-sm text-muted-foreground mt-2">{entry.description}</p>
                <p className="text-xs text-muted-foreground mt-4">
                  {fieldCount} {fieldCount === 1 ? 'field' : 'fields'}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
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
