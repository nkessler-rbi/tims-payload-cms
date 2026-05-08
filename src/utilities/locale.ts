import type { TypedLocale } from 'payload'

export const LOCALES = ['en', 'fr'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
}

export const isValidLocale = (value: string | undefined | null): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value)

export const assertLocale = (value: string): Locale => {
  if (!isValidLocale(value)) {
    throw new Error(`Invalid locale: ${value}`)
  }
  return value
}

export const toPayloadLocale = (locale: Locale): TypedLocale => locale as TypedLocale
