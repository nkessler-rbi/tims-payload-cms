import type { CardGridBlockProps } from './Component'

export const cardGridSampleData: CardGridBlockProps = {
  heading: 'Catering for every occasion',
  description: 'Boxed lunches, hot drinks and sweet treats — ready when you are.',
  columns: '3',
  items: [
    {
      image:
        'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=1200&q=80&auto=format&fit=crop',
      heading: 'Box Lunches',
      body: 'Sandwiches, wraps and sides packed for easy serving at meetings and events.',
      enableCta: true,
      link: { type: 'custom', label: 'Browse box lunches', url: '/en/catering#boxes' },
    },
    {
      image:
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=80&auto=format&fit=crop',
      heading: 'Sweet Trays',
      body: 'Timbits, muffins and donut platters — perfect for sharing.',
      enableCta: true,
      link: { type: 'custom', label: 'See sweet trays', url: '/en/catering#sweets' },
    },
    {
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop',
      heading: 'Coffee Travellers',
      body: '96 oz boxes of freshly brewed Tim Hortons coffee. Serves 8–10.',
      enableCta: true,
      link: { type: 'custom', label: 'Order travellers', url: '/en/catering#coffee' },
    },
  ],
}
