import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { blockRegistry, toLibrarySlug } from '@/blocks/registry'
import { designSystemRegistry } from '@/design-system/registry'
import { isValidLocale } from '@/utilities/locale'

const ROUTE_TITLE = {
  en: 'Block Library',
  fr: 'Bibliothèque de blocs',
}

const DESIGN_SYSTEM_TITLE = {
  en: 'Design System',
  fr: 'Système de design',
}

const DESIGN_SYSTEM_INTRO = {
  en: 'Tokens and rationale that all blocks above derive from. Authored in DESIGN.md, rendered live here.',
  fr: 'Tokens et rationnel dont s’inspirent tous les blocs ci-dessus. Rédigés dans DESIGN.md, rendus en direct ici.',
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

      <section className="mb-16">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{DESIGN_SYSTEM_TITLE[locale]}</h2>
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              {DESIGN_SYSTEM_INTRO[locale]}
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground shrink-0">
            DESIGN.md
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {designSystemRegistry.map((entry) => {
            const href = `/${locale}/blocks/design-system/${entry.slug}`
            const label = locale === 'fr' ? entry.labelFr : entry.label
            const description = locale === 'fr' ? entry.description_fr : entry.description
            return (
              <li
                key={entry.slug}
                className="border border-border rounded-lg p-5 bg-card hover:shadow-md transition"
              >
                <Link href={href} className="block">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                    {entry.slug}
                  </p>
                  <h3 className="text-xl font-semibold mt-1">{label}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{description}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            {locale === 'fr' ? 'Bibliothèque de blocs' : 'Block Library'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
            {locale === 'fr'
              ? 'Les blocs de mise en page disponibles dans le CMS.'
              : 'The layout blocks available in the CMS.'}
          </p>
        </div>

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
                  <h3 className="text-xl font-semibold mt-1">{entry.label}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{entry.description}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    {fieldCount} {fieldCount === 1 ? 'field' : 'fields'}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
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
