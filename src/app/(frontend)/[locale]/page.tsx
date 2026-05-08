import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { isValidLocale, type Locale } from '@/utilities/locale'

const COPY: Record<Locale, {
  eyebrow: string
  title: string
  subtitle: string
  catalogueTitle: string
  catalogueDesc: string
  libraryTitle: string
  libraryDesc: string
  catalogueCta: string
  libraryCta: string
}> = {
  en: {
    eyebrow: 'Tim Hortons CMS prototype',
    title: 'Static Pages, powered by Payload',
    subtitle:
      'A bilingual prototype proving that we can replace our existing CMS with Payload. Author marketing landing pages from a curated set of building blocks.',
    catalogueTitle: 'Static Pages catalogue',
    catalogueDesc:
      'Browse every campaign landing page currently published in the CMS, in either locale.',
    libraryTitle: 'Block Library',
    libraryDesc:
      'See every layout block that authors can drop into a static page, with a live preview and field schema.',
    catalogueCta: 'Browse pages',
    libraryCta: 'Browse blocks',
  },
  fr: {
    eyebrow: 'Prototype CMS Tim Hortons',
    title: 'Pages statiques, propulsées par Payload',
    subtitle:
      'Un prototype bilingue démontrant qu’on peut remplacer notre CMS actuel par Payload. Créez des pages de campagne à partir d’une bibliothèque de blocs.',
    catalogueTitle: 'Catalogue des pages statiques',
    catalogueDesc:
      'Parcourez toutes les pages de campagne publiées dans le CMS, en français ou en anglais.',
    libraryTitle: 'Bibliothèque de blocs',
    libraryDesc:
      'Tous les blocs de mise en page disponibles pour les rédacteurs, avec aperçu en direct et schéma des champs.',
    catalogueCta: 'Voir les pages',
    libraryCta: 'Voir les blocs',
  },
}

type Args = {
  params: Promise<{ locale: string }>
}

export default async function LandingPage({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  if (!isValidLocale(localeParam)) notFound()
  const locale = localeParam
  const copy = COPY[locale]

  return (
    <main className="container mx-auto px-4 py-20">
      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">{copy.eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-bold mt-3">{copy.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{copy.subtitle}</p>
      </header>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <Link
          href={`/${locale}/static-pages`}
          className="group block border border-border rounded-xl p-8 bg-card hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold">{copy.catalogueTitle}</h2>
          <p className="mt-3 text-muted-foreground">{copy.catalogueDesc}</p>
          <span className="inline-block mt-6 text-sm font-medium underline group-hover:no-underline">
            {copy.catalogueCta} →
          </span>
        </Link>

        <Link
          href={`/${locale}/blocks`}
          className="group block border border-border rounded-xl p-8 bg-card hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold">{copy.libraryTitle}</h2>
          <p className="mt-3 text-muted-foreground">{copy.libraryDesc}</p>
          <span className="inline-block mt-6 text-sm font-medium underline group-hover:no-underline">
            {copy.libraryCta} →
          </span>
        </Link>
      </section>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam } = await paramsPromise
  if (!isValidLocale(localeParam)) return {}
  return { title: COPY[localeParam].title }
}
