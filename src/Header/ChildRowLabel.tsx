'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type ChildRow = NonNullable<NonNullable<Header['navItems']>[number]['children']>[number]

export const ChildRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<ChildRow>()
  const position = data?.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const label = data?.data?.link?.label
  if (!label) return <div>Child {position}</div>
  return <div>{`${position}. ${label}`}</div>
}
