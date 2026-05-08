import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'
import { blockRichText } from '@/blocks/_shared/blockRichText'
import { link } from '@/fields/link'

export const TextWithImageBlock: Block = {
  slug: 'textWithImage',
  interfaceName: 'TextWithImageBlock',
  labels: {
    singular: 'Text With Image',
    plural: 'Text With Image Sections',
  },
  fields: [
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'right',
      required: true,
      options: [
        { label: 'Image on Right', value: 'right' },
        { label: 'Image on Left', value: 'left' },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: blockRichText,
      required: true,
      label: 'Body',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'enableCta',
      type: 'checkbox',
      label: 'Add a call-to-action link',
    },
    link({
      overrides: {
        admin: {
          condition: (_, sibling) => Boolean(sibling?.enableCta),
        },
      },
    }),
    anchorIdField,
  ],
}
