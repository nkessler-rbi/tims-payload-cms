import { lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

export const callToActionSampleData = {
  richText: lexicalWithHeading('Ready to get started?', [
    'Sign up your local hockey or soccer association today.',
  ]),
  links: [
    {
      link: {
        type: 'custom' as const,
        label: 'Register your team',
        url: '/en/register',
        appearance: 'default' as const,
      },
    },
  ],
}
