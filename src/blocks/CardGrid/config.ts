import type { Block, Field } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'
import { link } from '@/fields/link'

const itemFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Optional. Square or 4:3 crops work best.' },
  },
  { name: 'heading', type: 'text', required: true },
  { name: 'body', type: 'textarea' },
  {
    name: 'enableCta',
    type: 'checkbox',
    label: 'Add a call-to-action link',
  },
  link({
    appearances: false,
    overrides: {
      admin: {
        description: 'CTA link rendered under the card.',
        condition: (_, sibling) => Boolean(sibling?.enableCta),
      },
    },
  }),
]

export const CardGridBlock: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: {
    singular: 'Card Grid',
    plural: 'Card Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Optional section heading.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional short copy under the heading.' },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      required: true,
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 12,
      admin: { initCollapsed: true },
      fields: itemFields,
    },
    anchorIdField,
  ],
}
