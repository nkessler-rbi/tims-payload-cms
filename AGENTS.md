# Agents

This project uses the Payload CMS skill at `.agents/skills/payload/`.
Start with `.agents/skills/payload/SKILL.md` for a quick reference, then see `.agents/skills/payload/reference/` for detailed docs.

## Design system

Design tokens, color/typography rationale, and component styling guardrails are documented in [DESIGN.md](DESIGN.md). Consult it before adding new UI tokens or making styling decisions — it is the authoritative description of the Tim Hortons design system, following the [google-labs-code/design.md](https://github.com/google-labs-code/design.md) spec (YAML frontmatter + prose).

The runtime source of truth is `src/app/(frontend)/globals.css` and `tailwind.config.mjs`; DESIGN.md mirrors them. Parity is enforced:

- `pnpm design:lint` — every DESIGN.md token must match its CSS variable / Tailwind value.
- `pnpm design:spec` — validates DESIGN.md against the upstream `@google/design.md` spec.
- `pnpm design` — both of the above.
- `pnpm lint` — eslint **and** `design:lint`.

When changing a token, update both `globals.css` and the DESIGN.md frontmatter. When adding a brand-new color, also extend the `COLOR_TOKEN_TO_CSS_VAR` map in `scripts/design-md-lint.ts`.

The system is rendered live at `/[locale]/blocks` (top section) and at `/[locale]/blocks/design-system/[slug]`. Registry: `src/design-system/registry.ts`. Per-section render components: `src/design-system/sections/<Name>/Component.tsx`.
