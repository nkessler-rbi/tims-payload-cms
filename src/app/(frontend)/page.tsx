import { redirect } from 'next/navigation'
import { DEFAULT_LOCALE } from '@/utilities/locale'

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`)
}
