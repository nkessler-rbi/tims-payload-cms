import { lexicalWithHeading } from '@/blocks/_shared/lexicalSample'
import type { RichTextBlockProps } from './Component'

export const richTextSampleData: RichTextBlockProps = {
  richText: lexicalWithHeading('Interested in joining Timbit Sports? Registration is easy!', [
    'Your local restaurant owners are excited to sponsor your Timbits team and proud to sponsor youth in sports in communities across Canada.',
    'The Timbits program is available to boys, girls, and co-ed U3-U7 divisions. There is no cost to associations to participate in Timbit Sports.',
  ]),
}
