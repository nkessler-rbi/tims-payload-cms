import { lexicalParagraphs } from '@/blocks/_shared/lexicalSample'
import type { AccordionBlockProps } from './Component'

export const accordionSampleData: AccordionBlockProps = {
  heading: 'Frequently Asked Questions',
  items: [
    {
      question: 'What is the Tim Hortons Timbit Sports program?',
      answer: lexicalParagraphs([
        'The Tim Hortons Timbit Sports Program is a community-oriented program that provides opportunities for kids aged four to eight to play house league hockey and soccer.',
        'The philosophy of the program is not based on winning or losing, but on learning a new sport, making new friends and just being a kid.',
      ]),
    },
    {
      question: 'How does my local hockey or soccer association get enrolled?',
      answer: lexicalParagraphs([
        'Registration is easy! Please contact your regional Tim Hortons marketing manager with your association details.',
      ]),
    },
    {
      question: 'What is the ordering process?',
      answer: lexicalParagraphs([
        'Once you order your items, they will arrive within eight weeks. If you need them by a specific date, please include this information when you register.',
      ]),
    },
  ],
}
