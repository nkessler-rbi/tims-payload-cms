import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { blockRegistry, toLibrarySlug } from '@/blocks/registry'
import { designSystemRegistry } from '@/design-system/registry'
import { isValidLocale } from '@/utilities/locale'

const ROUTE_TITLE = {
  en: 'Design System',
  fr: 'Système de design',
}

const DESIGN_LANGUAGE_TITLE = {
  en: 'Design Language',
  fr: 'Langage de design',
}

const DESIGN_LANGUAGE_INTRO = {
  en: 'Tokens and rationale that every block below derives from. Authored in DESIGN.md, rendered live here.',
  fr: 'Tokens et rationnel dont s’inspirent tous les blocs ci-dessous. Rédigés dans DESIGN.md, rendus en direct ici.',
}

const BLOCK_LIBRARY_TITLE = {
  en: 'Block Library',
  fr: 'Bibliothèque de blocs',
}

const BLOCK_LIBRARY_INTRO = {
  en: 'The layout blocks available in the CMS — each one built on top of the design language above.',
  fr: 'Les blocs de mise en page disponibles dans le CMS — chacun construit sur le langage visuel ci-dessus.',
}

type Args = {
  params: Promise<{ locale: string }>
}

const sectionStyle = { padding: 'var(--section-y) 0' } as const
const containerStyle = { maxWidth: 'var(--max-w)', paddingInline: 'var(--gutter)' } as const

const eyebrowStyle = {
  fontSize: 13,
  letterSpacing: '0.12em',
  color: 'var(--th-muted)',
} as const

const bodyStyle = {
  fontSize: 17,
  lineHeight: 1.6,
  color: 'var(--th-muted)',
  maxWidth: '60ch',
} as const

const cardEyebrowStyle = {
  fontSize: 12,
  letterSpacing: '0.12em',
  color: 'var(--th-muted)',
} as const

const cardTitleStyle = {
  margin: 0,
  fontWeight: 600,
  fontSize: 'clamp(18px, 1.6vw, 22px)',
  lineHeight: 1.2,
  color: 'var(--th-espresso)',
} as const

const cardDescStyle = {
  fontSize: 15,
  lineHeight: 1.5,
  color: 'var(--th-muted)',
} as const

export default async function BlockLibrary({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  if (!isValidLocale(localeParam)) notFound()
  const locale = localeParam

  return (
    <main>
      {/* Page header */}
      <section style={sectionStyle}>
        <div className="mx-auto" style={containerStyle}>
          <p className="font-mono uppercase" style={eyebrowStyle}>
            {ROUTE_TITLE[locale]}
          </p>
          <h1 className="th-h1 mt-2" style={{ color: 'var(--th-espresso)' }}>
            {locale === 'fr' ? 'Le système de design Tim Hortons' : 'The Tim Hortons design system'}
          </h1>
          <p className="mt-4" style={bodyStyle}>
            {locale === 'fr'
              ? 'La couche fondamentale (langage visuel) et les blocs de mise en page construits par-dessus — avec un aperçu en direct et le schéma des champs.'
              : 'The foundational layer (design language) and the layout blocks built on top of it — with live previews and field schemas.'}
          </p>
        </div>
      </section>

      {/* Design Language */}
      <section style={{ ...sectionStyle, background: 'var(--th-cream)' }}>
        <div className="mx-auto" style={containerStyle}>
          <header
            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3"
            style={{ marginBottom: 40 }}
          >
            <div>
              <h2 className="th-h2" style={{ color: 'var(--th-espresso)' }}>
                {DESIGN_LANGUAGE_TITLE[locale]}
              </h2>
              <p className="mt-2" style={bodyStyle}>
                {DESIGN_LANGUAGE_INTRO[locale]}
              </p>
            </div>
            <p className="font-mono uppercase shrink-0" style={eyebrowStyle}>
              DESIGN.md
            </p>
          </header>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {designSystemRegistry.map((entry) => {
              const href = `/${locale}/blocks/design-system/${entry.slug}`
              const label = locale === 'fr' ? entry.labelFr : entry.label
              const description = locale === 'fr' ? entry.description_fr : entry.description
              return (
                <li
                  key={entry.slug}
                  className="rounded-[4px] border border-th-rule bg-white p-5 hover:shadow-md transition"
                >
                  <Link href={href} className="block">
                    <p className="font-mono uppercase" style={cardEyebrowStyle}>
                      {entry.slug}
                    </p>
                    <h3 className="font-display-bold mt-1" style={cardTitleStyle}>
                      {label}
                    </h3>
                    <p className="mt-2" style={cardDescStyle}>
                      {description}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Block Library */}
      <section style={sectionStyle}>
        <div className="mx-auto" style={containerStyle}>
          <header style={{ marginBottom: 40 }}>
            <h2 className="th-h2" style={{ color: 'var(--th-espresso)' }}>
              {BLOCK_LIBRARY_TITLE[locale]}
            </h2>
            <p className="mt-2" style={bodyStyle}>
              {BLOCK_LIBRARY_INTRO[locale]}
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
                  className="rounded-[4px] border border-th-rule bg-th-cream-soft p-5 hover:shadow-md transition"
                >
                  <Link href={href} className="block">
                    <p className="font-mono uppercase" style={cardEyebrowStyle}>
                      {entry.block.slug}
                    </p>
                    <h3 className="font-display-bold mt-1" style={cardTitleStyle}>
                      {entry.label}
                    </h3>
                    <p className="mt-2" style={cardDescStyle}>
                      {entry.description}
                    </p>
                    <p className="mt-4 font-mono" style={cardEyebrowStyle}>
                      {fieldCount} {fieldCount === 1 ? 'field' : 'fields'}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
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
