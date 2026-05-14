import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'
import { linkGroup } from '@/fields/linkGroup'

export const HeroBannerBlock: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Full-width background image. Use a wide, high-contrast photo.',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Optional small label shown above the title.' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Main h1 heading.' },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: { description: 'Optional supporting copy beneath the title.' },
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
        admin: { description: 'Up to 2 call-to-action buttons.' },
      },
    }),
    anchorIdField,
  ],
}
