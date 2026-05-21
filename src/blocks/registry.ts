import type { Block } from 'payload'
import type { ComponentType } from 'react'

import { AccordionBlock } from './Accordion/config'
import { AccordionBlockComponent } from './Accordion/Component'
import { accordionSampleData } from './Accordion/sampleData'

import { AnchorLinksBlock } from './AnchorLinks/config'
import { AnchorLinksBlockComponent } from './AnchorLinks/Component'
import { anchorLinksSampleData } from './AnchorLinks/sampleData'

import { ButtonBlock } from './ButtonBlock/config'
import { ButtonBlockComponent } from './ButtonBlock/Component'
import { buttonBlockSampleData } from './ButtonBlock/sampleData'

import { CallToAction } from './CallToAction/config'
import { CallToActionBlock } from './CallToAction/Component'
import { callToActionSampleData } from './CallToAction/sampleData'

import { CardGridBlock } from './CardGrid/config'
import { CardGridBlockComponent } from './CardGrid/Component'
import { cardGridSampleData } from './CardGrid/sampleData'

import { DoubleImageBlock } from './DoubleImage/config'
import { DoubleImageBlockComponent } from './DoubleImage/Component'
import { doubleImageSampleData } from './DoubleImage/sampleData'

import { FormBlock as FormBlockConfig } from './Form/config'
import { FormBlock as FormBlockComponent } from './Form/Component'
import { formBlockSampleData } from './Form/sampleData'

import { HeroBannerBlock } from './HeroBanner/config'
import { HeroBannerBlockComponent } from './HeroBanner/Component'
import { heroBannerSampleData } from './HeroBanner/sampleData'

import { ImageBlock } from './ImageBlock/config'
import { ImageBlockComponent } from './ImageBlock/Component'
import { imageSampleData } from './ImageBlock/sampleData'

import { PageHeaderBlock } from './PageHeader/config'
import { PageHeaderBlockComponent } from './PageHeader/Component'
import { pageHeaderSampleData } from './PageHeader/sampleData'

import { RichTextBlock } from './RichTextBlock/config'
import { RichTextBlockComponent } from './RichTextBlock/Component'
import { richTextSampleData } from './RichTextBlock/sampleData'

import { StepsBlock } from './Steps/config'
import { StepsBlockComponent } from './Steps/Component'
import { stepsSampleData } from './Steps/sampleData'

import { TextWithImageBlock } from './TextWithImage/config'
import { TextWithImageBlockComponent } from './TextWithImage/Component'
import { textWithImageSampleData } from './TextWithImage/sampleData'

export type BlockEntry = {
  block: Block
  Component: ComponentType<any>
  label: string
  description: string
  sampleData: Record<string, any>
}

/**
 * Single source of truth for all layout blocks.
 *
 * Adding a new block:
 *   1. Create src/blocks/<Name>/{config.ts, Component.tsx, sampleData.ts}
 *   2. Push it onto this array
 * The Pages.layout admin form, the public renderer, and the block library
 * will all pick it up automatically — no other edits required.
 */
export const blockRegistry: BlockEntry[] = [
  {
    block: HeroBannerBlock,
    Component: HeroBannerBlockComponent,
    label: 'Hero Banner',
    description: 'A full-width hero with background image, title, subtitle and up to 2 CTAs.',
    sampleData: heroBannerSampleData,
  },
  {
    block: PageHeaderBlock,
    Component: PageHeaderBlockComponent,
    label: 'Page Header',
    description: 'A title row at the top of a page, with optional eyebrow and subtitle.',
    sampleData: pageHeaderSampleData,
  },
  {
    block: AnchorLinksBlock,
    Component: AnchorLinksBlockComponent,
    label: 'Anchor Links',
    description: 'A horizontal nav of in-page jump links. Targets any block with an anchorId.',
    sampleData: anchorLinksSampleData,
  },
  {
    block: TextWithImageBlock,
    Component: TextWithImageBlockComponent,
    label: 'Text With Image',
    description: 'A two-column section with rich text on one side and an image on the other.',
    sampleData: textWithImageSampleData,
  },
  {
    block: DoubleImageBlock,
    Component: DoubleImageBlockComponent,
    label: 'Double Image',
    description: 'Two side-by-side cards (image + heading + body + CTA each).',
    sampleData: doubleImageSampleData,
  },
  {
    block: CardGridBlock,
    Component: CardGridBlockComponent,
    label: 'Card Grid',
    description: 'A 2/3/4-column grid of cards with image, heading, body and optional link.',
    sampleData: cardGridSampleData,
  },
  {
    block: StepsBlock,
    Component: StepsBlockComponent,
    label: 'Steps',
    description: 'A numbered list of steps for "how it works" sections.',
    sampleData: stepsSampleData,
  },
  {
    block: RichTextBlock,
    Component: RichTextBlockComponent,
    label: 'Rich Text',
    description: 'A free-form rich-text section with headings, lists, and inline formatting.',
    sampleData: richTextSampleData,
  },
  {
    block: ImageBlock,
    Component: ImageBlockComponent,
    label: 'Image',
    description: 'A single image with an optional caption and alt-text override.',
    sampleData: imageSampleData,
  },
  {
    block: CallToAction,
    Component: CallToActionBlock,
    label: 'Call to Action',
    description: 'A boxed call-to-action with rich text and one or two CTA buttons.',
    sampleData: callToActionSampleData,
  },
  {
    block: ButtonBlock,
    Component: ButtonBlockComponent,
    label: 'Button',
    description: 'A single button with selectable variant, size, and link target.',
    sampleData: buttonBlockSampleData,
  },
  {
    block: AccordionBlock,
    Component: AccordionBlockComponent,
    label: 'Accordion',
    description: 'A list of collapsible question/answer items. Great for FAQs.',
    sampleData: accordionSampleData,
  },
  {
    block: FormBlockConfig,
    Component: FormBlockComponent,
    label: 'Form',
    description: 'Embeds a form from the Forms collection (lead capture, account requests, etc.).',
    sampleData: formBlockSampleData,
  },
]

import { toKebabCase } from '@/utilities/toKebabCase'

/** Lookup map: block.slug (camelCase, as Payload stores it) -> registry entry */
export const blockRegistryBySlug: Record<string, BlockEntry> = Object.fromEntries(
  blockRegistry.map((entry) => [entry.block.slug, entry]),
)

/** URL-friendly kebab-case slug for the block library route. */
export const toLibrarySlug = (blockSlug: string): string => toKebabCase(blockSlug)

/** Lookup map: kebab-case URL slug -> registry entry */
export const blockRegistryByLibrarySlug: Record<string, BlockEntry> = Object.fromEntries(
  blockRegistry.map((entry) => [toLibrarySlug(entry.block.slug), entry]),
)
