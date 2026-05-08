import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'

export const ImageBlock: Block = {
  slug: 'imageBlock',
  interfaceName: 'ImageBlock',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional caption shown below the image.' },
    },
    {
      name: 'altOverride',
      type: 'text',
      admin: { description: 'Optional override for the alt text on this page.' },
    },
    anchorIdField,
  ],
}
