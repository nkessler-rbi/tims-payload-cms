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

## Design-system change protocol — read before editing

**This protocol is load-bearing.** Drift between DESIGN.md and the runtime CSS is the failure mode the system is designed to prevent. Every design-affecting change must go through DESIGN.md *first*, with the user's confirmation.

### Trigger conditions

If your task involves **editing** any of the following, the protocol fires:

- `src/app/(frontend)/globals.css` between lines 91-149 (the `:root` token block) or lines 151-187 (the `[data-theme='dark']` block)
- `tailwind.config.mjs` (theme, typography, fontFamily, or any `extend.*` block)
- `DESIGN.md` frontmatter (YAML between the `---` fences)
- Any file under `src/components/ui/` (Button, Card, Input, Select, etc.)
- Any `Component.tsx` under `src/blocks/<Name>/` where the change affects visual styling — colors, type, spacing, shape, layout primitives (does **not** fire for non-visual edits like adding a field, fixing localization, or changing a hyperlink)

If your task involves **introducing** any of the following, the protocol fires:

- A new CSS custom property (any new `--*` declaration)
- A new font family or font weight
- A new color, spacing token, radius, or typography level
- A new component primitive (a Button variant, a new shadcn-style component under `src/components/ui/`, a new shared visual idiom used across blocks)

### Required behavior on trigger

1. **STOP** before making any edit.
2. **Confirm with the user.** Use this phrasing or close to it:

   > *"This looks like a design-system-level change. Per AGENTS.md § Design-system change protocol, I should update DESIGN.md and the runtime CSS in lockstep. Specifically, I'll touch the following files in order:*
   > *1. `DESIGN.md` — \<which token / which prose section\>*
   > *2. `src/app/(frontend)/globals.css` — \<which CSS variable\>*
   > *3. \<any additional files: tailwind.config.mjs, scripts/design-md-lint.ts, etc.\>*
   >
   > *Proceed?"*

   The list must be **specific** — name the actual tokens, CSS variables, and files. A vague "I'll update the design system" is not sufficient.
3. **Wait for explicit user confirmation.** Do not begin editing until the user replies affirmatively.
4. **Execute the appropriate flow below.**
5. **Run `pnpm design:lint`** (or `pnpm design` for fuller coverage) and report the result to the user as the final step.

### Edit flow (changing an existing token / component)

1. Update [DESIGN.md](DESIGN.md) frontmatter with the new value.
2. Update the matching CSS variable in [src/app/(frontend)/globals.css](src/app/(frontend)/globals.css) — `:root` *and* `[data-theme='dark']` if the change is dark-mode-relevant.
3. If typographic, also update [tailwind.config.mjs](tailwind.config.mjs).
4. If the prose rationale in DESIGN.md would now be inaccurate, update the matching `##` section so the *why* stays current.
5. Run `pnpm design:lint`. Report the output.

### Introduce flow (adding a brand-new token / component)

1. Add the new token to [DESIGN.md](DESIGN.md) frontmatter under the correct group (`colors`, `typography`, `spacing`, `rounded`, `components`).
2. Add one or two sentences of rationale to the matching `##` section in [DESIGN.md](DESIGN.md). This is the *why* — what role the token plays, when to use it, what it replaces.
3. Add the matching runtime declaration: a new CSS variable in [src/app/(frontend)/globals.css](src/app/(frontend)/globals.css) (`:root` + `[data-theme='dark']` if relevant), or a new font/typography rule in [tailwind.config.mjs](tailwind.config.mjs).
4. If you added a new color, extend the `COLOR_TOKEN_TO_CSS_VAR` map in [scripts/design-md-lint.ts](scripts/design-md-lint.ts) so parity lint covers it. If you added a new typography token whose font family is not already enumerated, extend `TYPOGRAPHY_FONT_FAMILY_EXPECTATIONS` in the same file.
5. If you added a new component primitive, add it to the live grid in [src/design-system/sections/Components/Component.tsx](src/design-system/sections/Components/Component.tsx).
6. Run `pnpm design` (lint + spec). Report the output.

### When delegating to a subagent via the `Agent` tool

Subagents do not auto-load this AGENTS.md. If you are about to dispatch a subagent (via the `Agent` tool) on a task that *could* trigger this protocol, **include the trigger conditions and the required-confirmation requirement in the subagent's prompt** — paste them in directly. Without that, the subagent will not know to gate on user confirmation, and the protocol will be bypassed.

A short version you can paste into subagent prompts:

> *Before editing any of the following, stop and ask the user for explicit confirmation, listing the specific files you intend to touch in order: `globals.css :root`/`[data-theme='dark']` token blocks, `tailwind.config.mjs`, `DESIGN.md` frontmatter, files under `src/components/ui/`, or block component visual styling. Same gating applies if you are introducing a new CSS variable, font, color, spacing token, radius, or component primitive. See AGENTS.md § Design-system change protocol for the full workflow.*

### Cross-reference

For human-readable rationale on the same workflow, see [DESIGN.md](DESIGN.md) § *How to Use*, which is also rendered live at `/blocks/design-system/how-to-use`.
