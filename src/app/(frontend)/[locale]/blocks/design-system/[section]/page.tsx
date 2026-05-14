import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { resolve } from 'node:path'
import React from 'react'

import { designSystemRegistry, designSystemRegistryBySlug } from '@/design-system/registry'
import { parseDesignMd } from '@/design-system/parseDesignMd'
import { isValidLocale, type Locale } from '@/utilities/locale'

type Args = {
  params: Promise<{ locale: string; section: string }>
}

export async function generateStaticParams() {
  const params: { locale: Locale; section: string }[] = []
  for (const locale of ['en', 'fr'] as Locale[]) {
    for (const entry of designSystemRegistry) {
      params.push({ locale, section: entry.slug })
    }
  }
  return params
}

export default async function DesignSystemSectionPage({ params: paramsPromise }: Args) {
  const { locale: localeParam, section } = await paramsPromise
  if (!isValidLocale(localeParam)) notFound()
  const locale = localeParam

  const entry = designSystemRegistryBySlug[section]
  if (!entry) notFound()

  const design = parseDesignMd(resolve(process.cwd(), 'DESIGN.md'))
  const SectionComponent = entry.Component
  const label = locale === 'fr' ? entry.labelFr : entry.label
  const description = locale === 'fr' ? entry.description_fr : entry.description

  return (
    <main className="container mx-auto py-12">
      <nav className="text-sm mb-6">
        <Link href={`/${locale}/blocks`} className="text-muted-foreground hover:underline">
          {locale === 'fr' ? 'Bibliothèque de blocs' : 'Block Library'}
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-muted-foreground">
          {locale === 'fr' ? 'Système de design' : 'Design System'}
        </span>
        <span className="mx-2 text-muted-foreground">/</span>
        <span>{label}</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
          {entry.slug}
        </p>
        <h1 className="text-4xl font-bold mt-2">{label}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">{description}</p>
      </header>

      <section>
        <SectionComponent design={design} />
      </section>

      <nav className="mt-16 border-t border-border pt-6 text-sm">
        <Link href={`/${locale}/blocks`} className="text-muted-foreground hover:underline">
          ← {locale === 'fr' ? 'Retour à la bibliothèque' : 'Back to the library'}
        </Link>
      </nav>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, section } = await paramsPromise
  const entry = designSystemRegistryBySlug[section]
  if (!entry) return {}
  const label = locale === 'fr' ? entry.labelFr : entry.label
  return { title: `${label} – Design System` }
}
