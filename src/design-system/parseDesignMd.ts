import { readFileSync } from 'node:fs'
import YAML from 'yaml'

export type TypographyToken = {
  fontFamily?: string
  fontWeight?: number | string
  fontSize?: string
  lineHeight?: number | string
  letterSpacing?: string
  fontFeature?: string
  fontVariation?: string
}

export type ComponentToken = Record<string, string>

export type DesignSystem = {
  name: string
  description?: string
  version?: string
  colors: Record<string, string>
  typography: Record<string, TypographyToken>
  spacing: Record<string, string>
  rounded: Record<string, string>
  components: Record<string, ComponentToken>
  /** Markdown body sections keyed by their `## Heading` (lowercased, hyphenated). */
  sections: Record<string, string>
  /** The raw YAML object, including unknown keys. */
  raw: Record<string, unknown>
}

const FRONTMATTER_FENCE = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/

const sectionKey = (heading: string): string =>
  heading
    .toLowerCase()
    .replace(/['’]/g, '') // drop straight + curly apostrophes so "Don'ts" → "donts"
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Resolve `{path.to.token}` references in a string to their primitive value.
 * Returns the original string if the reference can't be resolved.
 */
const resolveReference = (value: string, root: Record<string, unknown>): string => {
  const match = value.match(/^\{([\w.-]+)\}$/)
  if (!match) return value
  const path = match[1].split('.')
  let cur: unknown = root
  for (const part of path) {
    if (cur && typeof cur === 'object' && part in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[part]
    } else {
      return value
    }
  }
  return typeof cur === 'string' || typeof cur === 'number' ? String(cur) : value
}

const resolveComponentTokens = (
  components: Record<string, ComponentToken>,
  root: Record<string, unknown>,
): Record<string, ComponentToken> => {
  const out: Record<string, ComponentToken> = {}
  for (const [name, token] of Object.entries(components)) {
    out[name] = {}
    for (const [prop, value] of Object.entries(token)) {
      out[name][prop] = typeof value === 'string' ? resolveReference(value, root) : String(value)
    }
  }
  return out
}

const splitSections = (body: string): Record<string, string> => {
  const sections: Record<string, string> = {}
  const lines = body.split('\n')
  let currentKey: string | null = null
  let buffer: string[] = []

  const flush = () => {
    if (currentKey) {
      sections[currentKey] = buffer.join('\n').trim()
    }
    buffer = []
  }

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      flush()
      currentKey = sectionKey(h2[1])
      continue
    }
    if (currentKey) buffer.push(line)
  }
  flush()
  return sections
}

export function parseDesignMd(filePath: string): DesignSystem {
  const raw = readFileSync(filePath, 'utf8')
  const match = raw.match(FRONTMATTER_FENCE)
  if (!match) {
    throw new Error(`${filePath}: missing YAML frontmatter delimited by '---' fences`)
  }
  const [, yamlText, body] = match
  const fm = (YAML.parse(yamlText) ?? {}) as Record<string, unknown>

  const colors = (fm.colors ?? {}) as Record<string, string>
  const typography = (fm.typography ?? {}) as Record<string, TypographyToken>
  const spacing = normalizeSpacing((fm.spacing ?? {}) as Record<string, string | number>)
  const rounded = normalizeSpacing((fm.rounded ?? {}) as Record<string, string | number>)
  const componentsRaw = (fm.components ?? {}) as Record<string, ComponentToken>

  const components = resolveComponentTokens(componentsRaw, fm)

  return {
    name: typeof fm.name === 'string' ? fm.name : 'Untitled',
    description: typeof fm.description === 'string' ? fm.description : undefined,
    version: typeof fm.version === 'string' ? fm.version : undefined,
    colors,
    typography,
    spacing,
    rounded,
    components,
    sections: splitSections(body),
    raw: fm,
  }
}

const normalizeSpacing = (
  input: Record<string, string | number>,
): Record<string, string> => {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(input)) {
    out[k] = typeof v === 'number' ? `${v}px` : v
  }
  return out
}

/** Path to the canonical DESIGN.md file relative to the repo root. */
export const DESIGN_MD_PATH = 'DESIGN.md'
