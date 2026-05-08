import type { Block, Field } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'
import { link } from '@/fields/link'

const cardFields: Field[] = [
  { name: 'image', type: 'upload', relationTo: 'media', required: true },
  { name: 'heading', type: 'text', required: true },
  { name: 'body', type: 'textarea' },
  link({
    appearances: false,
    overrides: { admin: { description: 'CTA link shown under the card.' } },
  }),
]

export const DoubleImageBlock: Block = {
  slug: 'doubleImage',
  interfaceName: 'DoubleImageBlock',
  labels: {
    singular: 'Double Image',
    plural: 'Double Images',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'card1',
          type: 'group',
          label: 'Left card',
          fields: cardFields,
          admin: { width: '50%' },
        },
        {
          name: 'card2',
          type: 'group',
          label: 'Right card',
          fields: cardFields,
          admin: { width: '50%' },
        },
      ],
    },
    anchorIdField,
  ],
}
