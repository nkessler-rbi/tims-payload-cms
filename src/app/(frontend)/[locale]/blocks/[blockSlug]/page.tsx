import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { blockRegistry, blockRegistryByLibrarySlug, toLibrarySlug } from '@/blocks/registry'
import { introspectFields } from '@/blocks/_shared/introspectFields'
import { isValidLocale, type Locale } from '@/utilities/locale'

type Args = {
  params: Promise<{ locale: string; blockSlug: string }>
}

export async function generateStaticParams() {
  const params: { locale: Locale; blockSlug: string }[] = []
  for (const locale of ['en', 'fr'] as Locale[]) {
    for (const entry of blockRegistry) {
      params.push({ locale, blockSlug: toLibrarySlug(entry.block.slug) })
    }
  }
  return params
}

const FieldList: React.FC<{ rows: ReturnType<typeof introspectFields> }> = ({ rows }) => {
  if (rows.length === 0) return <p className="text-muted-foreground text-sm">No fields.</p>

  return (
    <ul className="divide-y divide-border border-y border-border">
      {rows.map((row, i) => (
        <li key={`${row.name}-${i}`} className="py-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <code className="font-mono text-sm font-semibold">{row.name}</code>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {row.type}
            </span>
            {row.required && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                required
              </span>
            )}
            {row.localized && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                localized
              </span>
            )}
          </div>
          {row.description && (
            <p className="text-sm text-muted-foreground mt-1">{row.description}</p>
          )}
          {row.children && row.children.length > 0 && (
            <div className="ml-4 mt-3 border-l border-border pl-4">
              <FieldList rows={row.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default async function BlockDetail({ params: paramsPromise }: Args) {
  const { locale: localeParam, blockSlug } = await paramsPromise
  if (!isValidLocale(localeParam)) notFound()
  const locale = localeParam

  const entry = blockRegistryByLibrarySlug[blockSlug]
  if (!entry) notFound()

  const Block = entry.Component
  const fieldRows = introspectFields(entry.block.fields)

  return (
    <main className="container mx-auto py-12">
      <nav className="text-sm mb-6">
        <Link href={`/${locale}/blocks`} className="text-muted-foreground hover:underline">
          {locale === 'fr' ? 'Système de design' : 'Design System'}
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span>{entry.label}</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
          {entry.block.slug}
        </p>
        <h1 className="text-4xl font-bold mt-2">{entry.label}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">{entry.description}</p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          {locale === 'fr' ? 'Aperçu' : 'Preview'}
        </h2>
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <Block {...entry.sampleData} locale={locale} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          {locale === 'fr' ? 'Champs' : 'Fields'}
        </h2>
        <FieldList rows={fieldRows} />
      </section>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { blockSlug } = await paramsPromise
  const entry = blockRegistryByLibrarySlug[blockSlug]
  if (!entry) return {}
  return { title: `${entry.label} – Design System` }
}
