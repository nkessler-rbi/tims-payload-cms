import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'

export const StepsBlock: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  labels: {
    singular: 'Steps',
    plural: 'Steps Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Optional small label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Optional section heading shown above the numbered steps.' },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Step', plural: 'Steps' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    anchorIdField,
  ],
}
