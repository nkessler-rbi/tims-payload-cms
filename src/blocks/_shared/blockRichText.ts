import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * A standard rich-text editor used by MVP layout blocks.
 * Headings (h2-h4), inline + fixed toolbars, and inherits root features
 * (paragraph, bold, italic, underline, link) from the default lexical config.
 */
export const blockRichText = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
