import type { HeroBannerBlockProps } from './Component'

export const heroBannerSampleData: HeroBannerBlockProps = {
  backgroundImage:
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=2000&q=80&auto=format&fit=crop',
  eyebrow: 'Tims Rewards',
  title: 'Earn rewards on every order',
  subtitle:
    'Get free coffee, baked goods and more — just by ordering through the Tim Hortons app.',
  alignment: 'left',
  links: [
    {
      link: {
        type: 'custom',
        label: 'Join Tims Rewards',
        url: '/en/tims-rewards',
        appearance: 'default',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Learn how it works',
        url: '/en/tims-rewards#how-it-works',
        appearance: 'outline',
      },
    },
  ],
}
