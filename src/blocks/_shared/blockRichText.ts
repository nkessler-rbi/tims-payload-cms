import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * A standard rich-text editor used by MVP layout blocks.
 * Headings (h2-h4), bulleted + numbered lists, inline + fixed toolbars,
 * and inherits root features (paragraph, bold, italic, underline, link)
 * from the default lexical config.
 */
export const blockRichText = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
