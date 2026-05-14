import type { Payload, PayloadRequest } from 'payload'

import { lexicalParagraphs, lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
  accountDeletionFormId: number | string
}

export const seedAccountDeletion = async ({
  payload,
  req,
  accountDeletionFormId,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding Account Deletion page (EN + FR)...`)

  for (const slug of ['account-deletion', 'suppression-de-compte']) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, req })
  }

  const enLayout: any[] = [
    {
      blockType: 'pageHeader',
      eyebrow: 'Privacy',
      title: 'Account deletion',
      subtitle: 'Request the permanent deletion of your Tim Hortons account and the data we hold about you.',
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalWithHeading('How to request deletion', [
        'You can request the deletion of your Tim Hortons app account at any time. Once we receive your request, we will permanently delete your account, your Tims Rewards points balance, and your order history within 30 days.',
        'You can also delete your account directly from the Tim Hortons mobile app: open the app, go to Profile → Settings → Delete account.',
      ]),
    },
    {
      blockType: 'formBlock',
      enableIntro: true,
      introContent: lexicalWithHeading('Submit a deletion request', [
        'Fill out the form below. We’ll verify your identity using the email associated with your account before processing the request.',
      ]),
      form: accountDeletionFormId,
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalParagraphs([
        'Once deleted, your account cannot be recovered. Any unredeemed Tims Rewards points will be forfeited.',
        'If you have questions about how Tim Hortons handles your personal information, please review our Privacy Notice or contact privacy@timhortons.example.',
      ]),
    },
  ]

  const created = await payload.create({
    collection: 'pages',
    locale: 'en',
    depth: 0,
    req,
    data: {
      title: 'Account Deletion',
      slug: 'account-deletion',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'pageHeader',
      eyebrow: 'Confidentialité',
      title: 'Suppression de compte',
      subtitle: 'Demandez la suppression permanente de votre compte Tim Hortons et des données que nous détenons à votre sujet.',
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalWithHeading('Comment demander la suppression', [
        'Vous pouvez demander la suppression de votre compte Tim Hortons à tout moment. Une fois la demande reçue, nous supprimerons définitivement votre compte, le solde de vos points Récompenses Tims et votre historique de commandes dans un délai de 30 jours.',
        'Vous pouvez aussi supprimer votre compte directement depuis l’appli Tim Hortons: ouvrez l’appli, allez à Profil → Paramètres → Supprimer le compte.',
      ]),
    },
    {
      blockType: 'formBlock',
      enableIntro: true,
      introContent: lexicalWithHeading('Soumettre une demande', [
        'Remplissez le formulaire ci-dessous. Nous vérifierons votre identité avec le courriel associé à votre compte avant de traiter la demande.',
      ]),
      form: accountDeletionFormId,
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalParagraphs([
        'Une fois supprimé, votre compte ne peut être récupéré. Les points Récompenses Tims non utilisés seront perdus.',
        'Pour toute question sur la façon dont Tim Hortons traite vos renseignements personnels, consultez notre Avis de confidentialité ou écrivez à privacy@timhortons.example.',
      ]),
    },
  ]

  await payload.update({
    collection: 'pages',
    id: created.id,
    locale: 'fr',
    depth: 0,
    req,
    data: {
      title: 'Suppression de compte',
      slug: 'suppression-de-compte',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/account-deletion and /fr/suppression-de-compte`)
}
