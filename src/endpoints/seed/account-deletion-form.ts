import { RequiredDataFromCollectionSlug } from 'payload'

export const accountDeletionForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Account Deletion Request Form',
  submitButtonLabel: 'Submit deletion request',
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'heading',
          tag: 'h2',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Your deletion request has been received.',
              version: 1,
            },
          ],
        },
        {
          type: 'paragraph',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          textFormat: 0,
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'We will process your request within 30 days and send a confirmation to the email on file once complete.',
              version: 1,
            },
          ],
        },
      ],
    },
  },
  emails: [
    {
      emailFrom: '"Tim Hortons Privacy" <privacy@timhortons.example>',
      emailTo: '{{email}}',
      subject: 'Your Tim Hortons account deletion request',
      message: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              textFormat: 0,
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'We have received your account deletion request and will process it within 30 days.',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
    },
  ],
  fields: [
    {
      name: 'full-name',
      blockName: 'full-name',
      blockType: 'text',
      label: 'Full name on account',
      required: true,
      width: 100,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: 'Email associated with your account',
      required: true,
      width: 100,
    },
    {
      name: 'phone',
      blockName: 'phone',
      blockType: 'number',
      label: 'Phone (optional, for verification)',
      required: false,
      width: 100,
    },
    {
      name: 'reason',
      blockName: 'reason',
      blockType: 'textarea',
      label: 'Reason for deletion (optional)',
      required: false,
      width: 100,
    },
    {
      name: 'confirm',
      blockName: 'confirm',
      blockType: 'checkbox',
      label: 'I understand my account, points, and order history will be permanently deleted.',
      required: true,
      width: 100,
    },
  ],
}
