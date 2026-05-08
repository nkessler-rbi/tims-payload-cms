import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'
import { blockRichText } from '@/blocks/_shared/blockRichText'

export const AccordionBlock: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  labels: {
    singular: 'Accordion',
    plural: 'Accordions',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Optional heading shown above the accordion.' },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        { name: 'question', type: 'text', required: true },
        {
          name: 'answer',
          type: 'richText',
          editor: blockRichText,
          required: true,
        },
      ],
    },
    anchorIdField,
  ],
}
