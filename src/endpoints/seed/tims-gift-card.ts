import type { Payload, PayloadRequest } from 'payload'

import { lexicalParagraphs, lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
  heroImage: { id: number | string }
  cardImageA: { id: number | string }
  cardImageB: { id: number | string }
  cardImageC: { id: number | string }
  balanceImage: { id: number | string }
}

export const seedTimsGiftCard = async ({
  payload,
  req,
  heroImage,
  cardImageA,
  cardImageB,
  cardImageC,
  balanceImage,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding Tims Gift Card page (EN + FR)...`)

  for (const slug of ['tims-gift-card', 'carte-cadeau-tims']) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, req })
  }

  const enLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'TimCard',
      title: 'Give the gift of Tims',
      subtitle: 'A Tim Hortons gift card always hits the spot — for the coffee lover, the donut fan, or the early-morning regular.',
      alignment: 'left',
      links: [
        { link: { type: 'custom', label: 'Buy a card', url: '/en/tims-gift-card#buy', appearance: 'default' } },
        { link: { type: 'custom', label: 'Check balance', url: '/en/tims-gift-card#balance', appearance: 'outline' } },
      ],
    },
    {
      blockType: 'cardGrid',
      anchorId: 'buy',
      heading: 'Choose your card',
      description: 'Send a digital card by email or pick up a physical one in your local restaurant.',
      columns: '3',
      items: [
        {
          image: cardImageA.id,
          heading: 'Digital eGift Card',
          body: 'Send by email any time. Recipients can add it straight to their Tim Hortons app.',
          enableCta: true,
          link: { type: 'custom', label: 'Buy digital', url: '/en/tims-gift-card#egift' },
        },
        {
          image: cardImageB.id,
          heading: 'Physical TimCard',
          body: 'Pick up a classic TimCard at any participating Tim Hortons restaurant.',
          enableCta: true,
          link: { type: 'custom', label: 'Find a restaurant', url: '/en/locations' },
        },
        {
          image: cardImageC.id,
          heading: 'Bulk orders for business',
          body: 'Stock cards for client gifts, employee recognition, or fundraising — with custom amounts.',
          enableCta: true,
          link: { type: 'custom', label: 'Contact bulk sales', url: '/en/tims-gift-card#bulk' },
        },
      ],
    },
    {
      blockType: 'steps',
      anchorId: 'how',
      eyebrow: 'How it works',
      heading: 'Send a card in 3 steps',
      items: [
        { title: 'Pick a design and amount', body: 'Choose from holiday, birthday, or everyday designs and set the value.' },
        { title: 'Add a personal message', body: 'Write a note for the recipient and pick a send date — today or scheduled.' },
        { title: 'Pay and send', body: 'Pay securely; the recipient gets an email with the digital card ready to redeem.' },
      ],
    },
    {
      blockType: 'textWithImage',
      anchorId: 'balance',
      mediaPosition: 'left',
      richText: lexicalWithHeading('Check your TimCard balance', [
        'Have a card already? Look up your balance and recent activity online in seconds. You can also register your card to protect the balance if it’s ever lost.',
      ]),
      media: balanceImage.id,
      enableCta: true,
      link: {
        type: 'custom',
        label: 'Check balance',
        url: '/en/tims-gift-card/balance',
        appearance: 'default',
      },
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'Gift card FAQs',
      items: [
        {
          question: 'Where can I redeem my TimCard?',
          answer: lexicalParagraphs([
            'TimCards can be used at participating Tim Hortons restaurants in Canada and the United States, as well as in the Tim Hortons mobile app.',
          ]),
        },
        {
          question: 'Do TimCards expire?',
          answer: lexicalParagraphs([
            'No — TimCards do not expire and are not subject to dormancy fees.',
          ]),
        },
        {
          question: 'Can I reload my TimCard?',
          answer: lexicalParagraphs([
            'Yes. You can reload a physical or digital card in the Tim Hortons app or at the cash register.',
          ]),
        },
        {
          question: 'What if my card is lost or stolen?',
          answer: lexicalParagraphs([
            'Register your TimCard online so we can transfer the remaining balance to a replacement if it’s ever lost.',
          ]),
        },
      ],
    },
  ]

  const created = await payload.create({
    collection: 'pages',
    locale: 'en',
    depth: 0,
    req,
    data: {
      title: 'Tims Gift Card',
      slug: 'tims-gift-card',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'TimCard',
      title: 'Offrez le plaisir Tims',
      subtitle: 'Une carte-cadeau Tim Hortons fait toujours plaisir — aux amateurs de café, aux fans de beignes, ou aux habitués du matin.',
      alignment: 'left',
      links: [
        { link: { type: 'custom', label: 'Acheter une carte', url: '/fr/carte-cadeau-tims#buy', appearance: 'default' } },
        { link: { type: 'custom', label: 'Vérifier le solde', url: '/fr/carte-cadeau-tims#balance', appearance: 'outline' } },
      ],
    },
    {
      blockType: 'cardGrid',
      anchorId: 'buy',
      heading: 'Choisissez votre carte',
      description: 'Envoyez une carte numérique par courriel ou procurez-vous une carte physique dans votre restaurant local.',
      columns: '3',
      items: [
        {
          image: cardImageA.id,
          heading: 'Carte-cadeau numérique',
          body: 'Envoyez-la par courriel à tout moment. Le destinataire peut l’ajouter directement à l’appli Tim Hortons.',
          enableCta: true,
          link: { type: 'custom', label: 'Acheter numérique', url: '/fr/carte-cadeau-tims#egift' },
        },
        {
          image: cardImageB.id,
          heading: 'TimCard physique',
          body: 'Procurez-vous une TimCard classique dans tout restaurant Tim Hortons participant.',
          enableCta: true,
          link: { type: 'custom', label: 'Trouver un restaurant', url: '/fr/locations' },
        },
        {
          image: cardImageC.id,
          heading: 'Commandes en grande quantité',
          body: 'Cartes pour cadeaux clients, reconnaissance des employés ou collectes de fonds — montants personnalisés.',
          enableCta: true,
          link: { type: 'custom', label: 'Contactez les ventes', url: '/fr/carte-cadeau-tims#bulk' },
        },
      ],
    },
    {
      blockType: 'steps',
      anchorId: 'how',
      eyebrow: 'Comment ça marche',
      heading: 'Envoyer une carte en 3 étapes',
      items: [
        { title: 'Choisissez un visuel et un montant', body: 'Sélectionnez un design (fêtes, anniversaire, quotidien) et fixez le montant.' },
        { title: 'Ajoutez un message', body: 'Rédigez une note personnalisée et choisissez la date d’envoi.' },
        { title: 'Payez et envoyez', body: 'Payez en toute sécurité; le destinataire reçoit un courriel avec sa carte prête à être utilisée.' },
      ],
    },
    {
      blockType: 'textWithImage',
      anchorId: 'balance',
      mediaPosition: 'left',
      richText: lexicalWithHeading('Vérifiez le solde de votre TimCard', [
        'Vous avez déjà une carte? Consultez votre solde et votre activité récente en ligne en quelques secondes. Vous pouvez aussi enregistrer votre carte pour protéger le solde en cas de perte.',
      ]),
      media: balanceImage.id,
      enableCta: true,
      link: {
        type: 'custom',
        label: 'Vérifier le solde',
        url: '/fr/carte-cadeau-tims/solde',
        appearance: 'default',
      },
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'FAQ carte-cadeau',
      items: [
        {
          question: 'Où puis-je utiliser ma TimCard?',
          answer: lexicalParagraphs([
            'Les TimCards sont acceptées dans les restaurants Tim Hortons participants au Canada et aux États-Unis, ainsi que dans l’appli Tim Hortons.',
          ]),
        },
        {
          question: 'Les TimCards expirent-elles?',
          answer: lexicalParagraphs([
            'Non — les TimCards n’expirent pas et ne sont pas assujetties à des frais d’inactivité.',
          ]),
        },
        {
          question: 'Puis-je recharger ma TimCard?',
          answer: lexicalParagraphs([
            'Oui. Vous pouvez recharger une carte numérique ou physique dans l’appli Tim Hortons ou à la caisse.',
          ]),
        },
        {
          question: 'Que faire si ma carte est perdue ou volée?',
          answer: lexicalParagraphs([
            'Enregistrez votre TimCard en ligne pour que nous puissions transférer le solde restant sur une carte de remplacement en cas de perte.',
          ]),
        },
      ],
    },
  ]

  await payload.update({
    collection: 'pages',
    id: created.id,
    locale: 'fr',
    depth: 0,
    req,
    data: {
      title: 'Carte-cadeau Tims',
      slug: 'carte-cadeau-tims',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/tims-gift-card and /fr/carte-cadeau-tims`)
}
