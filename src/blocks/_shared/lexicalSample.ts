import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

/**
 * Build a minimal Lexical editor state from a list of paragraph texts.
 * Useful for sampleData on blocks. Supports plain paragraphs only.
 */
export const lexicalParagraphs = (paragraphs: string[]): DefaultTypedEditorState => ({
  root: {
    type: 'root',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      textFormat: 0,
      children: [
        {
          type: 'text',
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text,
          version: 1,
        },
      ],
    })),
  },
})

/** Build a Lexical editor state with a single heading followed by paragraphs. */
export const lexicalWithHeading = (
  heading: string,
  paragraphs: string[],
  tag: 'h2' | 'h3' | 'h4' = 'h2',
): DefaultTypedEditorState => ({
  root: {
    type: 'root',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'heading',
        tag,
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: heading,
            version: 1,
          },
        ],
      },
      ...paragraphs.map((text) => ({
        type: 'paragraph' as const,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
        textFormat: 0,
        children: [
          {
            type: 'text' as const,
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text,
            version: 1,
          },
        ],
      })),
    ],
  },
})
