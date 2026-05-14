import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      labels: { singular: 'Top-level nav item', plural: 'Top-level nav items' },
      admin: {
        initCollapsed: true,
        description:
          'Top-level navbar entries. If "Children" has items, this entry renders as a dropdown.',
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Text shown in the top-level navbar.' },
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            admin: {
              description:
                'Where this top-level entry links to. Hidden when children are present (then this entry acts as a dropdown parent).',
              condition: (_, sibling) => !sibling?.children?.length,
            },
          },
        }),
        {
          name: 'children',
          type: 'array',
          labels: { singular: 'Dropdown child', plural: 'Dropdown children' },
          maxRows: 8,
          admin: {
            initCollapsed: true,
            description: 'Optional. When present, the top-level entry becomes a dropdown.',
            components: {
              RowLabel: '@/Header/ChildRowLabel#ChildRowLabel',
            },
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
