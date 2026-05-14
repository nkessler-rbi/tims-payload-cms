import { lexicalWithHeading, lexicalParagraphs } from '@/blocks/_shared/lexicalSample'

/**
 * Sample data for the block library preview only. The real FormBlock on a page
 * pulls its `form` from a populated forms collection doc; here we hand-craft a
 * minimal shape that satisfies the client Component.
 */
export const formBlockSampleData = {
  enableIntro: true,
  introContent: lexicalWithHeading('Get in touch', [
    'Fill out the form below and someone from our team will reach out.',
  ]),
  form: {
    id: 'sample-form',
    title: 'Sample Form',
    submitButtonLabel: 'Submit',
    confirmationType: 'message' as const,
    confirmationMessage: lexicalParagraphs(['Thanks — we have received your submission.']),
    fields: [
      {
        name: 'full-name',
        blockName: 'full-name',
        blockType: 'text',
        label: 'Full Name',
        required: true,
        width: 100,
      },
      {
        name: 'email',
        blockName: 'email',
        blockType: 'email',
        label: 'Email',
        required: true,
        width: 100,
      },
      {
        name: 'message',
        blockName: 'message',
        blockType: 'textarea',
        label: 'Message',
        required: false,
        width: 100,
      },
    ],
  } as any,
}
