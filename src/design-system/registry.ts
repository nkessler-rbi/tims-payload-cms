import type { ComponentType } from 'react'

import { ColorsSection } from './sections/Colors/Component'
import { ComponentsSection } from './sections/Components/Component'
import { DosDontsSection } from './sections/DosDonts/Component'
import { ElevationSection } from './sections/Elevation/Component'
import { HowToUseSection } from './sections/HowToUse/Component'
import { LayoutSection } from './sections/Layout/Component'
import { OverviewSection } from './sections/Overview/Component'
import { ShapesSection } from './sections/Shapes/Component'
import { TypographySection } from './sections/Typography/Component'
import type { DesignSystem } from './parseDesignMd'

export type DesignSectionEntry = {
  /** URL slug for /blocks/design-system/<slug> */
  slug: string
  /** Display label, English. */
  label: string
  /** Display label, French. */
  labelFr: string
  /** Description shown on the block library card. */
  description: string
  description_fr: string
  /** Server component that renders the live view. Receives parsed `design`. */
  Component: ComponentType<{ design: DesignSystem }>
}

/**
 * Single source of truth for the Design System section listing on /blocks.
 *
 * The slug order here is the display order in the library grid.
 * The slug values must remain stable since they are baked into URLs.
 */
export const designSystemRegistry: DesignSectionEntry[] = [
  {
    slug: 'how-to-use',
    label: 'How to Use',
    labelFr: 'Comment l’utiliser',
    description: 'The workflow for editing or adding to this design system — and the files to touch.',
    description_fr: 'Le flux pour modifier ou enrichir ce système de design — et les fichiers à éditer.',
    Component: HowToUseSection,
  },
  {
    slug: 'overview',
    label: 'Overview',
    labelFr: 'Aperçu',
    description: 'Brand voice, posture, and the three instincts the system is built around.',
    description_fr: 'Voix de marque, posture et les trois instincts qui guident le système.',
    Component: OverviewSection,
  },
  {
    slug: 'colors',
    label: 'Colors',
    labelFr: 'Couleurs',
    description: 'TH red, cream foundation, and the espresso palette — with contrast ratios.',
    description_fr: 'Rouge TH, fond crème et palette espresso — avec les ratios de contraste.',
    Component: ColorsSection,
  },
  {
    slug: 'typography',
    label: 'Typography',
    labelFr: 'Typographie',
    description: 'Sofia Pro for impact, Manrope for body, JetBrains Mono for labels.',
    description_fr: 'Sofia Pro pour l’impact, Manrope pour le corps, JetBrains Mono pour les étiquettes.',
    Component: TypographySection,
  },
  {
    slug: 'layout',
    label: 'Layout & Spacing',
    labelFr: 'Mise en page',
    description: 'Fluid container, max content width, and the section vertical rhythm.',
    description_fr: 'Conteneur fluide, largeur maximale et rythme vertical des sections.',
    Component: LayoutSection,
  },
  {
    slug: 'elevation',
    label: 'Elevation & Depth',
    labelFr: 'Élévation',
    description: 'Tonal layers — cream on white. Shadows are minimal-to-absent.',
    description_fr: 'Couches tonales — crème sur blanc. Les ombres sont rares ou absentes.',
    Component: ElevationSection,
  },
  {
    slug: 'shapes',
    label: 'Shapes',
    labelFr: 'Formes',
    description: '4px is the brand-canonical radius. The system is engineered, not playful.',
    description_fr: '4px est le rayon canonique de la marque. Le système est mesuré, pas ludique.',
    Component: ShapesSection,
  },
  {
    slug: 'components',
    label: 'Components',
    labelFr: 'Composants',
    description: 'Buttons, CTA block, cards — the atomic chrome of the system.',
    description_fr: 'Boutons, bloc CTA, cartes — le squelette atomique du système.',
    Component: ComponentsSection,
  },
  {
    slug: 'dos-donts',
    label: "Do's & Don'ts",
    labelFr: 'À faire et à éviter',
    description: 'Guardrails. The shortest path to staying on-brand.',
    description_fr: 'Garde-fous. Le chemin le plus court pour rester fidèle à la marque.',
    Component: DosDontsSection,
  },
]

export const designSystemRegistryBySlug: Record<string, DesignSectionEntry> = Object.fromEntries(
  designSystemRegistry.map((entry) => [entry.slug, entry]),
)
