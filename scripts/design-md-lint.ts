/**
 * Lints DESIGN.md frontmatter against the runtime sources of truth:
 *   - src/app/(frontend)/globals.css  (CSS custom properties under :root)
 *   - tailwind.config.mjs             (typography font-family declarations)
 *
 * Exits non-zero on any drift. Wired into `pnpm lint` so eslint and design
 * parity run together.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseDesignMd } from '../src/design-system/parseDesignMd'

const REPO_ROOT = resolve(import.meta.dirname, '..')
const GLOBALS_CSS = resolve(REPO_ROOT, 'src/app/(frontend)/globals.css')
const TAILWIND_CONFIG = resolve(REPO_ROOT, 'tailwind.config.mjs')

/**
 * Map of DESIGN.md `colors.<token>` → CSS variable in globals.css :root.
 * Adding a new color token? Add its mapping here too.
 */
const COLOR_TOKEN_TO_CSS_VAR: Record<string, string> = {
  primary: '--th-red',
  'primary-dark': '--th-red-dark',
  'primary-ink': '--th-red-ink',
  neutral: '--th-cream',
  'neutral-soft': '--th-cream-soft',
  secondary: '--th-espresso',
  'secondary-soft': '--th-espresso-soft',
  'on-surface': '--th-ink',
  'on-surface-muted': '--th-muted',
  outline: '--th-rule',
  'outline-strong': '--th-rule-strong',
  surface: '--background',
}

/**
 * Map of DESIGN.md `typography.<token>.fontFamily` → expected family
 * declared in tailwind.config.mjs. The brand display fonts are exposed
 * via CSS variables (--font-display, --font-display-bold), so the lint
 * resolves both sides to family strings before comparing.
 */
const TYPOGRAPHY_FONT_FAMILY_EXPECTATIONS: Record<string, string> = {
  h1: 'Sofia Pro Black',
  h2: 'Sofia Pro Bold',
  h3: 'Sofia Pro Bold',
  'body-md': 'Manrope',
  'body-lg': 'Manrope',
  'label-mono': 'JetBrains Mono',
}

type Finding = { severity: 'error' | 'ok' | 'info'; message: string }

const findings: Finding[] = []

const parseCssVars = (css: string): Record<string, string> => {
  // Match :root { ... } block only (light theme is authoritative for DESIGN.md v1).
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/)
  if (!rootMatch) throw new Error(`Could not find :root { ... } block in globals.css`)
  const block = rootMatch[1]
  const vars: Record<string, string> = {}
  // capture --name: value;  (value continues until the next semicolon)
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g
  let m: RegExpExecArray | null
  while ((m = re.exec(block)) !== null) {
    vars[m[1]] = m[2].trim()
  }
  return vars
}

const normalizeColor = (s: string): string => s.trim().toLowerCase()

const checkColors = (
  designColors: Record<string, string>,
  cssVars: Record<string, string>,
) => {
  for (const [token, hex] of Object.entries(designColors)) {
    const cssVar = COLOR_TOKEN_TO_CSS_VAR[token]
    if (!cssVar) {
      findings.push({
        severity: 'info',
        message: `colors.${token} (${hex}): no CSS variable mapping declared in lint script — skipped`,
      })
      continue
    }
    const cssValue = cssVars[cssVar]
    if (cssValue === undefined) {
      findings.push({
        severity: 'error',
        message: `colors.${token}: expected --${cssVar.slice(2)} in :root but it is not declared`,
      })
      continue
    }
    if (normalizeColor(cssValue) !== normalizeColor(hex)) {
      findings.push({
        severity: 'error',
        message: `colors.${token}: DESIGN.md says "${hex}" but ${cssVar} in globals.css is "${cssValue}"`,
      })
      continue
    }
    findings.push({ severity: 'ok', message: `colors.${token} (${hex}) ↔ ${cssVar}` })
  }
}

const checkTypography = (
  designTypography: Record<string, { fontFamily?: string }>,
  tailwindConfig: string,
) => {
  for (const [token, expectedFamily] of Object.entries(TYPOGRAPHY_FONT_FAMILY_EXPECTATIONS)) {
    const entry = designTypography[token]
    if (!entry) {
      findings.push({
        severity: 'error',
        message: `typography.${token}: missing in DESIGN.md frontmatter`,
      })
      continue
    }
    if (entry.fontFamily !== expectedFamily) {
      findings.push({
        severity: 'error',
        message: `typography.${token}.fontFamily: DESIGN.md says "${entry.fontFamily}" — lint expected "${expectedFamily}". Update either the DESIGN.md token or this lint script's expectation.`,
      })
      continue
    }
    findings.push({
      severity: 'ok',
      message: `typography.${token}.fontFamily ("${expectedFamily}") matches lint expectation`,
    })
  }
  // Sanity check that the four CSS font variables are still declared in tailwind.config.mjs
  for (const v of ['--font-sans', '--font-mono', '--font-display', '--font-display-bold']) {
    if (!tailwindConfig.includes(v)) {
      findings.push({
        severity: 'error',
        message: `tailwind.config.mjs: expected font variable ${v} to be referenced but it is not`,
      })
    }
  }
}

const COLOR_RESET = '\x1b[0m'
const COLOR_RED = '\x1b[31m'
const COLOR_GREEN = '\x1b[32m'
const COLOR_DIM = '\x1b[2m'

const main = () => {
  const design = parseDesignMd(resolve(REPO_ROOT, 'DESIGN.md'))
  const cssVars = parseCssVars(readFileSync(GLOBALS_CSS, 'utf8'))
  const tailwindConfig = readFileSync(TAILWIND_CONFIG, 'utf8')

  checkColors(design.colors, cssVars)
  checkTypography(design.typography, tailwindConfig)

  let errors = 0
  for (const f of findings) {
    if (f.severity === 'error') {
      errors++
      console.error(`${COLOR_RED}✗${COLOR_RESET} ${f.message}`)
    } else if (f.severity === 'ok') {
      console.log(`${COLOR_GREEN}✓${COLOR_RESET} ${f.message}`)
    } else {
      console.log(`${COLOR_DIM}·${COLOR_RESET} ${f.message}`)
    }
  }

  const summary = `${findings.filter((f) => f.severity === 'ok').length} ok, ${errors} error${errors === 1 ? '' : 's'}`
  if (errors > 0) {
    console.error(`\n${COLOR_RED}DESIGN.md drift detected — ${summary}.${COLOR_RESET}`)
    process.exit(1)
  }
  console.log(`\n${COLOR_GREEN}DESIGN.md ↔ globals.css ↔ tailwind.config.mjs in sync — ${summary}.${COLOR_RESET}`)
}

main()
