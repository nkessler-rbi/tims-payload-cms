import type { Field } from 'payload'

type FieldRow = {
  name: string
  type: string
  required: boolean
  localized: boolean
  description?: string
  children?: FieldRow[]
}

const isNamedField = (field: Field): field is Extract<Field, { name: string }> =>
  'name' in field && typeof (field as { name?: unknown }).name === 'string'

/**
 * Flatten Payload field configs into a simple row shape for display.
 * Recurses into row/group/array/blocks/tabs/collapsible containers so the
 * library page can show a complete schema for a block.
 */
export const introspectFields = (fields: Field[] | undefined): FieldRow[] => {
  if (!fields) return []
  const rows: FieldRow[] = []

  for (const field of fields) {
    const type = field.type

    if (type === 'row' || type === 'collapsible') {
      rows.push(...introspectFields(field.fields))
      continue
    }

    if (type === 'tabs') {
      for (const tab of field.tabs) {
        if ('name' in tab && tab.name) {
          rows.push({
            name: tab.name,
            type: 'tab',
            required: false,
            localized: Boolean((tab as { localized?: boolean }).localized),
            description: typeof tab.label === 'string' ? tab.label : undefined,
            children: introspectFields(tab.fields),
          })
        } else {
          rows.push(...introspectFields(tab.fields))
        }
      }
      continue
    }

    if (!isNamedField(field)) continue

    const base: FieldRow = {
      name: field.name,
      type,
      required: Boolean((field as { required?: boolean }).required),
      localized: Boolean((field as { localized?: boolean }).localized),
      description:
        typeof (field as { admin?: { description?: unknown } }).admin?.description === 'string'
          ? ((field as { admin?: { description?: string } }).admin?.description as string)
          : undefined,
    }

    if (type === 'group' || type === 'array') {
      base.children = introspectFields((field as { fields?: Field[] }).fields)
    }

    rows.push(base)
  }

  return rows
}
