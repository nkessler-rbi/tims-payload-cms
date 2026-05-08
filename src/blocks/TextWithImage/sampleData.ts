import { lexicalWithHeading } from '@/blocks/_shared/lexicalSample'
import type { TextWithImageBlockProps } from './Component'

export const textWithImageSampleData: TextWithImageBlockProps = {
  mediaPosition: 'right',
  richText: lexicalWithHeading('Supporting youth in sports across Canada', [
    'Tims restaurant owners annually support over 300,000 children between 4 to 8 years old by removing financial barriers and providing them access to entry-level organized sports with an emphasis on learning a new game, making new friends, and having fun.',
  ]),
  media: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1200&q=80&auto=format&fit=crop',
  enableCta: false,
}
