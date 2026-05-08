import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'

export const PageHeaderBlock: Block = {
  slug: 'pageHeader',
  interfaceName: 'PageHeaderBlock',
  labels: {
    singular: 'Page Header',
    plural: 'Page Headers',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Optional small text shown above the title.' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: { description: 'Optional secondary line shown below the title.' },
    },
    anchorIdField,
  ],
}
