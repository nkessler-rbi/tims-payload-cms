import type { Field } from 'payload'

/**
 * Optional anchor id that can be added to any block so an AnchorLinks block
 * can target it for in-page navigation.
 */
export const anchorIdField: Field = {
  name: 'anchorId',
  type: 'text',
  admin: {
    description:
      'Optional. Set an id (e.g. "hockey") so an Anchor Links block can scroll to this section.',
    placeholder: 'e.g. hockey',
  },
}
