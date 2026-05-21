import type { Block } from 'payload'

import { anchorIdField } from '@/blocks/_shared/anchorId'

export const ButtonBlock: Block = {
  slug: 'button',
  interfaceName: 'ButtonBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'alignment',
          type: 'select',
          defaultValue: 'left',
          admin: {
            width: '50%',
            description: 'Horizontal alignment within the section.',
          },
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          admin: {
            width: '50%',
            description: 'Visual style — matches the Button component variants.',
          },
          options: [
            { label: 'Primary (default)', value: 'default' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Destructive', value: 'destructive' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Link', value: 'link' },
          ],
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'default',
          admin: {
            width: '50%',
          },
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium (default)', value: 'default' },
            { label: 'Large', value: 'lg' },
          ],
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      admin: { hideGutter: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'reference',
              admin: { layout: 'horizontal', width: '50%' },
              options: [
                { label: 'Internal link', value: 'reference' },
                { label: 'Custom URL', value: 'custom' },
              ],
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
              admin: { width: '50%', style: { alignSelf: 'flex-end' } },
            },
          ],
        },
        {
          name: 'reference',
          type: 'relationship',
          label: 'Document to link to',
          relationTo: ['pages', 'posts'],
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Custom URL',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
      ],
    },
    anchorIdField,
  ],
  labels: {
    plural: 'Buttons',
    singular: 'Button',
  },
}
