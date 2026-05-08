import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'
import { blockRichText } from '@/blocks/_shared/blockRichText'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  interfaceName: 'RichTextBlock',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Text Sections',
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: blockRichText,
      required: true,
      label: false,
    },
    anchorIdField,
  ],
}
