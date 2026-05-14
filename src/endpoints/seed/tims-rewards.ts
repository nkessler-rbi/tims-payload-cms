import type { Payload, PayloadRequest } from 'payload'

import { lexicalParagraphs, lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
  heroImage: { id: number | string }
  perkImageA: { id: number | string }
  perkImageB: { id: number | string }
  perkImageC: { id: number | string }
  appImage: { id: number | string }
}

export const seedTimsRewards = async ({
  payload,
  req,
  heroImage,
  perkImageA,
  perkImageB,
  perkImageC,
  appImage,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding Tims Rewards page (EN + FR)...`)

  for (const slug of ['tims-rewards', 'recompenses-tims']) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, req })
  }

  const enLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'Tims Rewards',
      title: 'Earn rewards on every order',
      subtitle:
        'Get free coffee, baked goods, and more — just by ordering through the Tim Hortons app.',
      alignment: 'left',
      links: [
        { link: { type: 'custom', label: 'Join Tims Rewards', url: '/en/tims-rewards#join', appearance: 'default' } },
        { link: { type: 'custom', label: 'How it works', url: '/en/tims-rewards#how-it-works', appearance: 'outline' } },
      ],
    },
    {
      blockType: 'steps',
      anchorId: 'how-it-works',
      eyebrow: 'How it works',
      heading: 'Start earning in 3 easy steps',
      items: [
        { title: 'Sign up', body: 'Download the Tim Hortons app and create your free Tims Rewards account.' },
        { title: 'Scan or order', body: 'Scan your app at checkout — in-store or drive-thru — to start earning points.' },
        { title: 'Redeem rewards', body: 'Use your points for free coffee, donuts, breakfast items, and more.' },
      ],
    },
    {
      blockType: 'cardGrid',
      anchorId: 'perks',
      heading: 'Perks you’ll love',
      description: 'Built for everyday Tims runs.',
      columns: '3',
      items: [
        {
          image: perkImageA.id,
          heading: 'Free favourites',
          body: 'Redeem points for any size hot or iced coffee, a baked good, or a Smile Cookie.',
        },
        {
          image: perkImageB.id,
          heading: 'Birthday treat',
          body: 'A free reward shows up in your app every year on your birthday.',
        },
        {
          image: perkImageC.id,
          heading: 'Bonus point offers',
          body: 'Personalized weekly offers let you stack points faster on the things you already order.',
        },
      ],
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('Faster ordering in the Tims app', [
        'Order ahead and pay through the app to skip the line. Your points are automatically added to every mobile order — no scanning required.',
      ]),
      media: appImage.id,
      enableCta: true,
      link: {
        type: 'custom',
        label: 'Download the app',
        url: '/en/tims-rewards#download',
        appearance: 'default',
      },
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'Tims Rewards FAQs',
      items: [
        {
          question: 'How many points do I earn per visit?',
          answer: lexicalParagraphs([
            'You earn points on every qualifying purchase. Point values vary by item — your in-app receipt shows exactly how many you earned.',
          ]),
        },
        {
          question: 'Do my points expire?',
          answer: lexicalParagraphs([
            'Points expire 12 months after they are earned. Redeem regularly to keep them active.',
          ]),
        },
        {
          question: 'Can I use Tims Rewards at any Tim Hortons?',
          answer: lexicalParagraphs([
            'Yes — Tims Rewards works at participating Tim Hortons restaurants across Canada and the United States.',
          ]),
        },
        {
          question: 'Is there a fee to join?',
          answer: lexicalParagraphs([
            'No. Tims Rewards is free to join through the Tim Hortons mobile app.',
          ]),
        },
      ],
    },
    {
      blockType: 'cta',
      anchorId: 'join',
      richText: lexicalWithHeading('Join Tims Rewards today', [
        'It takes less than a minute and the rewards start with your very next order.',
      ]),
      links: [
        { link: { type: 'custom', label: 'Get the app', url: '/en/tims-rewards#download', appearance: 'default' } },
        { link: { type: 'custom', label: 'See the rules', url: '/en/tims-rewards#terms', appearance: 'outline' } },
      ],
    },
  ]

  const created = await payload.create({
    collection: 'pages',
    locale: 'en',
    depth: 0,
    req,
    data: {
      title: 'Tims Rewards',
      slug: 'tims-rewards',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'Récompenses Tims',
      title: 'Des récompenses à chaque commande',
      subtitle:
        'Obtenez du café gratuit, des produits de boulangerie et bien plus — simplement en commandant via l’appli Tim Hortons.',
      alignment: 'left',
      links: [
        { link: { type: 'custom', label: 'S’inscrire', url: '/fr/recompenses-tims#join', appearance: 'default' } },
        { link: { type: 'custom', label: 'Comment ça marche', url: '/fr/recompenses-tims#how-it-works', appearance: 'outline' } },
      ],
    },
    {
      blockType: 'steps',
      anchorId: 'how-it-works',
      eyebrow: 'Comment ça marche',
      heading: 'Commencez à accumuler en 3 étapes',
      items: [
        { title: 'Inscrivez-vous', body: 'Téléchargez l’appli Tim Hortons et créez votre compte Récompenses Tims gratuitement.' },
        { title: 'Scannez ou commandez', body: 'Scannez votre appli à la caisse — en restaurant ou au service à l’auto — pour accumuler des points.' },
        { title: 'Échangez vos récompenses', body: 'Utilisez vos points pour du café, des beignes, des déjeuners et plus encore.' },
      ],
    },
    {
      blockType: 'cardGrid',
      anchorId: 'perks',
      heading: 'Des avantages que vous allez adorer',
      description: 'Pensés pour vos visites de tous les jours.',
      columns: '3',
      items: [
        {
          image: perkImageA.id,
          heading: 'Favoris gratuits',
          body: 'Échangez vos points contre un café chaud ou glacé, un produit de boulangerie ou un biscuit Sourire.',
        },
        {
          image: perkImageB.id,
          heading: 'Gâterie d’anniversaire',
          body: 'Une récompense gratuite apparaît dans votre appli chaque année à votre anniversaire.',
        },
        {
          image: perkImageC.id,
          heading: 'Offres bonis',
          body: 'Des offres hebdomadaires personnalisées vous permettent d’accumuler plus vite sur vos commandes habituelles.',
        },
      ],
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('Commandez plus vite avec l’appli', [
        'Commandez à l’avance et payez via l’appli pour éviter la file. Vos points sont ajoutés automatiquement à chaque commande mobile — aucun scan requis.',
      ]),
      media: appImage.id,
      enableCta: true,
      link: {
        type: 'custom',
        label: 'Télécharger l’appli',
        url: '/fr/recompenses-tims#download',
        appearance: 'default',
      },
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'FAQ Récompenses Tims',
      items: [
        {
          question: 'Combien de points je reçois par visite?',
          answer: lexicalParagraphs([
            'Vous accumulez des points sur chaque achat admissible. La valeur en points varie selon l’article — votre reçu dans l’appli affiche le détail.',
          ]),
        },
        {
          question: 'Mes points expirent-ils?',
          answer: lexicalParagraphs([
            'Les points expirent 12 mois après leur attribution. Échangez-les régulièrement pour les garder actifs.',
          ]),
        },
        {
          question: 'Puis-je utiliser Récompenses Tims dans tous les Tim Hortons?',
          answer: lexicalParagraphs([
            'Oui — Récompenses Tims fonctionne dans les restaurants Tim Hortons participants au Canada et aux États-Unis.',
          ]),
        },
        {
          question: 'Y a-t-il des frais d’inscription?',
          answer: lexicalParagraphs([
            'Non. L’inscription à Récompenses Tims est gratuite via l’appli mobile Tim Hortons.',
          ]),
        },
      ],
    },
    {
      blockType: 'cta',
      anchorId: 'join',
      richText: lexicalWithHeading('Inscrivez-vous aujourd’hui', [
        'Il suffit de moins d’une minute, et les récompenses commencent à votre prochaine commande.',
      ]),
      links: [
        { link: { type: 'custom', label: 'Obtenir l’appli', url: '/fr/recompenses-tims#download', appearance: 'default' } },
        { link: { type: 'custom', label: 'Voir les règles', url: '/fr/recompenses-tims#terms', appearance: 'outline' } },
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
      title: 'Récompenses Tims',
      slug: 'recompenses-tims',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/tims-rewards and /fr/recompenses-tims`)
}
