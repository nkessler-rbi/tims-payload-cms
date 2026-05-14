'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const position = data?.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const label = data?.data?.label
  const childCount = data?.data?.children?.length ?? 0

  if (!label) return <div>Row {position}</div>

  const suffix = childCount > 0 ? ` — ${childCount} child${childCount === 1 ? '' : 'ren'}` : ''
  return <div>{`${position}. ${label}${suffix}`}</div>
}
