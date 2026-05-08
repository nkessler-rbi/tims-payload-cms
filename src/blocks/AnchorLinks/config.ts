import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'

export const AnchorLinksBlock: Block = {
  slug: 'anchorLinks',
  interfaceName: 'AnchorLinksBlock',
  labels: {
    singular: 'Anchor Links',
    plural: 'Anchor Links',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Link', plural: 'Links' },
      admin: { initCollapsed: false },
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'targetAnchorId',
          type: 'text',
          required: true,
          admin: {
            description:
              'The anchor id of another block on this page (without the # prefix), e.g. "hockey".',
          },
        },
      ],
    },
    anchorIdField,
  ],
}
