import type { Payload, PayloadRequest } from 'payload'

import { lexicalParagraphs, lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
  heroImage: { id: number | string }
  cardImageA: { id: number | string }
  cardImageB: { id: number | string }
  cardImageC: { id: number | string }
  cateringFormId: number | string
}

export const seedCatering = async ({
  payload,
  req,
  heroImage,
  cardImageA,
  cardImageB,
  cardImageC,
  cateringFormId,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding Catering page (EN + FR)...`)

  for (const slug of ['catering', 'services-de-traiteur']) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, req })
  }

  const enLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'Catering',
      title: 'Catering for every occasion',
      subtitle:
        'From morning meetings to weekend gatherings, Tim Hortons catering brings fresh-brewed coffee, baked goods, and boxed lunches right to you.',
      alignment: 'left',
      links: [
        { link: { type: 'custom', label: 'Start an order', url: '/en/catering#order', appearance: 'default' } },
        { link: { type: 'custom', label: 'Browse menu', url: '/en/catering#menu', appearance: 'outline' } },
      ],
    },
    {
      blockType: 'anchorLinks',
      items: [
        { label: 'Menu', targetAnchorId: 'menu' },
        { label: 'How to order', targetAnchorId: 'how-to-order' },
        { label: 'Inquiry', targetAnchorId: 'order' },
        { label: 'FAQs', targetAnchorId: 'faqs' },
      ],
    },
    {
      blockType: 'cardGrid',
      anchorId: 'menu',
      heading: 'Catering categories',
      description: 'Mix and match to build a spread that fits your group.',
      columns: '3',
      items: [
        {
          image: cardImageA.id,
          heading: 'Box Lunches',
          body: 'Made-to-order sandwiches and wraps with sides and a freshly baked cookie.',
          enableCta: true,
          link: { type: 'custom', label: 'See box lunches', url: '/en/catering#boxes' },
        },
        {
          image: cardImageB.id,
          heading: 'Sweet Trays & Timbits',
          body: 'Donut, muffin, and Timbit platters — perfect for sharing at meetings or events.',
          enableCta: true,
          link: { type: 'custom', label: 'See sweet trays', url: '/en/catering#sweets' },
        },
        {
          image: cardImageC.id,
          heading: 'Coffee Travellers',
          body: '96 oz boxes of freshly brewed coffee that serve 8–10 cups. Cream, sugar, and cups included.',
          enableCta: true,
          link: { type: 'custom', label: 'Order coffee', url: '/en/catering#coffee' },
        },
      ],
    },
    {
      blockType: 'steps',
      anchorId: 'how-to-order',
      eyebrow: 'How it works',
      heading: 'Ordering catering in 3 steps',
      items: [
        { title: 'Choose your menu', body: 'Pick the boxes, trays, and beverages that fit your group size.' },
        { title: 'Tell us when and where', body: 'Submit your event date, location, and timing through the inquiry form below.' },
        { title: 'We confirm and deliver', body: 'A catering specialist confirms availability and arranges pickup or delivery.' },
      ],
    },
    {
      blockType: 'formBlock',
      anchorId: 'order',
      enableIntro: true,
      introContent: lexicalWithHeading('Send us your catering inquiry', [
        'Fill out the form and a member of our team will follow up within 2 business days to confirm your order.',
      ]),
      form: cateringFormId,
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'Frequently asked questions',
      items: [
        {
          question: 'How far in advance should I place a catering order?',
          answer: lexicalParagraphs([
            'We recommend at least 24 hours notice for most orders, and 48–72 hours for larger groups (50+ guests).',
          ]),
        },
        {
          question: 'Do you offer delivery?',
          answer: lexicalParagraphs([
            'Delivery is available in select markets. Your local restaurant will confirm delivery options when they receive your inquiry.',
          ]),
        },
        {
          question: 'Can I customize a box lunch?',
          answer: lexicalParagraphs([
            'Yes — most box lunch combos let you choose the sandwich and the side. Note any allergens or substitutions in your inquiry.',
          ]),
        },
        {
          question: 'What is the cancellation policy?',
          answer: lexicalParagraphs([
            'Orders cancelled at least 24 hours before pickup or delivery receive a full refund. Same-day cancellations may incur a fee.',
          ]),
        },
      ],
    },
    {
      blockType: 'cta',
      richText: lexicalWithHeading('Ready to cater your next event?', [
        'Reach out to your local Tim Hortons and let us take care of the rest.',
      ]),
      links: [
        { link: { type: 'custom', label: 'Start an order', url: '/en/catering#order', appearance: 'default' } },
      ],
    },
  ]

  const created = await payload.create({
    collection: 'pages',
    locale: 'en',
    depth: 0,
    req,
    data: {
      title: 'Catering',
      slug: 'catering',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'Services de traiteur',
      title: 'Du traiteur pour toutes les occasions',
      subtitle:
        'Des réunions du matin aux rassemblements de fin de semaine, le service traiteur de Tim Hortons vous livre café fraîchement infusé, pâtisseries et boîtes repas.',
      alignment: 'left',
      links: [
        { link: { type: 'custom', label: 'Commander', url: '/fr/services-de-traiteur#order', appearance: 'default' } },
        { link: { type: 'custom', label: 'Voir le menu', url: '/fr/services-de-traiteur#menu', appearance: 'outline' } },
      ],
    },
    {
      blockType: 'anchorLinks',
      items: [
        { label: 'Menu', targetAnchorId: 'menu' },
        { label: 'Commander', targetAnchorId: 'how-to-order' },
        { label: 'Demande', targetAnchorId: 'order' },
        { label: 'FAQ', targetAnchorId: 'faqs' },
      ],
    },
    {
      blockType: 'cardGrid',
      anchorId: 'menu',
      heading: 'Catégories de traiteur',
      description: 'Composez un assortiment qui convient à votre groupe.',
      columns: '3',
      items: [
        {
          image: cardImageA.id,
          heading: 'Boîtes repas',
          body: 'Sandwichs et wraps préparés à la commande, accompagnés de garnitures et d’un biscuit fraîchement cuit.',
          enableCta: true,
          link: { type: 'custom', label: 'Voir les boîtes repas', url: '/fr/services-de-traiteur#boxes' },
        },
        {
          image: cardImageB.id,
          heading: 'Plateaux sucrés et Timbits',
          body: 'Plateaux de beignes, muffins et Timbits — parfaits à partager lors d’une réunion ou d’un événement.',
          enableCta: true,
          link: { type: 'custom', label: 'Voir les plateaux', url: '/fr/services-de-traiteur#sweets' },
        },
        {
          image: cardImageC.id,
          heading: 'Cafés à emporter',
          body: 'Boîtes de 96 oz de café fraîchement infusé. Sert 8 à 10 tasses. Crème, sucre et gobelets inclus.',
          enableCta: true,
          link: { type: 'custom', label: 'Commander du café', url: '/fr/services-de-traiteur#coffee' },
        },
      ],
    },
    {
      blockType: 'steps',
      anchorId: 'how-to-order',
      eyebrow: 'Comment ça marche',
      heading: 'Commandez en 3 étapes',
      items: [
        { title: 'Choisissez votre menu', body: 'Sélectionnez les boîtes, plateaux et boissons qui conviennent à votre groupe.' },
        { title: 'Dites-nous quand et où', body: 'Soumettez votre date, l’adresse et l’heure via le formulaire ci-dessous.' },
        { title: 'Confirmation et livraison', body: 'Un spécialiste confirme la disponibilité et organise la cueillette ou la livraison.' },
      ],
    },
    {
      blockType: 'formBlock',
      anchorId: 'order',
      enableIntro: true,
      introContent: lexicalWithHeading('Envoyez-nous votre demande', [
        'Remplissez le formulaire et un membre de notre équipe vous répondra dans les 2 jours ouvrables.',
      ]),
      form: cateringFormId,
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'Foire aux questions',
      items: [
        {
          question: 'Combien de temps à l’avance dois-je passer une commande?',
          answer: lexicalParagraphs([
            'Nous recommandons au moins 24 heures d’avis pour la plupart des commandes, et 48 à 72 heures pour les grands groupes (50+ personnes).',
          ]),
        },
        {
          question: 'Offrez-vous la livraison?',
          answer: lexicalParagraphs([
            'La livraison est disponible dans certains marchés. Votre restaurant local confirmera les options à la réception de votre demande.',
          ]),
        },
        {
          question: 'Puis-je personnaliser une boîte repas?',
          answer: lexicalParagraphs([
            'Oui — la plupart des combos vous permettent de choisir le sandwich et l’accompagnement. Notez les allergènes au moment de la demande.',
          ]),
        },
        {
          question: 'Quelle est la politique d’annulation?',
          answer: lexicalParagraphs([
            'Les commandes annulées au moins 24 heures à l’avance sont remboursées intégralement. Les annulations le jour même peuvent entraîner des frais.',
          ]),
        },
      ],
    },
    {
      blockType: 'cta',
      richText: lexicalWithHeading('Prêt pour votre prochain événement?', [
        'Communiquez avec votre Tim Hortons local et laissez-nous nous occuper du reste.',
      ]),
      links: [
        { link: { type: 'custom', label: 'Commander', url: '/fr/services-de-traiteur#order', appearance: 'default' } },
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
      title: 'Services de traiteur',
      slug: 'services-de-traiteur',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/catering and /fr/services-de-traiteur`)
}
