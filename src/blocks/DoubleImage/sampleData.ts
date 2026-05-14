import type { DoubleImageBlockProps } from './Component'

export const doubleImageSampleData: DoubleImageBlockProps = {
  card1: {
    image:
      'https://images.unsplash.com/photo-1515703407324-5f51c2972778?w=1200&q=80&auto=format&fit=crop',
    heading: 'Timbits Hockey',
    body: 'Learn more about how Tim Hortons supports youth hockey across Canada.',
    enableCta: true,
    link: { type: 'custom', label: 'Learn more', url: '/en/timbits-hockey' },
  },
  card2: {
    image:
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&q=80&auto=format&fit=crop',
    heading: 'Timbits Soccer',
    body: 'Learn more about how Tim Hortons supports youth soccer across Canada.',
    enableCta: true,
    link: { type: 'custom', label: 'Learn more', url: '/en/timbits-soccer' },
  },
}
