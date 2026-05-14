import type { Payload, PayloadRequest } from 'payload'

import { lexicalParagraphs, lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
  heroImage: { id: number | string }
  introImage: { id: number | string }
  whyImageA: { id: number | string }
  whyImageB: { id: number | string }
  franchiseFormId: number | string
}

export const seedFranchise = async ({
  payload,
  req,
  heroImage,
  introImage,
  whyImageA,
  whyImageB,
  franchiseFormId,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding Franchise page (EN + FR)...`)

  for (const slug of ['franchise']) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, req })
  }

  const enLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'Franchising',
      title: 'Build a business with Canada’s coffee brand',
      subtitle:
        'Tim Hortons is one of the most recognized restaurant brands in North America. Join a network of franchisees serving their communities every day.',
      alignment: 'left',
      links: [
        { link: { type: 'custom', label: 'Start an inquiry', url: '/en/franchise#inquiry', appearance: 'default' } },
        { link: { type: 'custom', label: 'How it works', url: '/en/franchise#process', appearance: 'outline' } },
      ],
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('Owning a Tim Hortons', [
        'Tim Hortons restaurants are operated by independent franchisees who share our commitment to fresh coffee, friendly service, and being part of the neighbourhood.',
        'Our development team partners with you from site selection through opening day and beyond.',
      ]),
      media: introImage.id,
    },
    {
      blockType: 'doubleImage',
      anchorId: 'why',
      card1: {
        image: whyImageA.id,
        heading: 'A trusted brand',
        body: 'A national brand built on decades of community trust and customer loyalty.',
      },
      card2: {
        image: whyImageB.id,
        heading: 'End-to-end support',
        body: 'Real estate, training, marketing, and operations support from day one.',
      },
    },
    {
      blockType: 'steps',
      anchorId: 'process',
      eyebrow: 'Process',
      heading: 'Becoming a franchisee',
      items: [
        { title: 'Submit your inquiry', body: 'Tell us about your background, location preference, and capital available.' },
        { title: 'Discovery call', body: 'A franchise development manager walks through the opportunity and answers your questions.' },
        { title: 'Application & approval', body: 'Complete the formal application; our team reviews finances, experience, and references.' },
        { title: 'Site selection & training', body: 'We help you find a location and put you through our operator training program.' },
        { title: 'Open for business', body: 'Open your restaurant with ongoing support from your operations team.' },
      ],
    },
    {
      blockType: 'richTextBlock',
      anchorId: 'investment',
      richText: lexicalWithHeading('Investment & requirements', [
        'The total investment to open a standard Tim Hortons restaurant typically falls between $500,000 and $1.9 million depending on format, location, and build-out.',
        'Successful candidates typically have at least $500,000 in liquid capital, demonstrated business or operational leadership experience, and a passion for serving guests.',
        'All figures are estimates. The Franchise Disclosure Document (FDD) provided to qualified candidates contains the complete details.',
      ]),
    },
    {
      blockType: 'formBlock',
      anchorId: 'inquiry',
      enableIntro: true,
      introContent: lexicalWithHeading('Start your franchise inquiry', [
        'Tell us a bit about yourself and our franchise development team will follow up if there is an opportunity that matches your background.',
      ]),
      form: franchiseFormId,
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'Franchise FAQs',
      items: [
        {
          question: 'Do I need restaurant experience?',
          answer: lexicalParagraphs([
            'Restaurant experience is helpful but not required. Strong operational, leadership, and customer-service backgrounds are also considered.',
          ]),
        },
        {
          question: 'How long does the approval process take?',
          answer: lexicalParagraphs([
            'From initial inquiry to approval typically takes 3 to 6 months, with site selection and training adding additional time before opening.',
          ]),
        },
        {
          question: 'Are there ongoing fees?',
          answer: lexicalParagraphs([
            'Yes — franchisees pay royalties and contribute to a national advertising fund. Full details are in the Franchise Disclosure Document.',
          ]),
        },
        {
          question: 'Can I own more than one restaurant?',
          answer: lexicalParagraphs([
            'Many of our most successful operators run multiple locations. Multi-unit opportunities are available after a successful first-restaurant ramp-up.',
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
      title: 'Franchise',
      slug: 'franchise',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'Franchisage',
      title: 'Bâtissez une entreprise avec la marque de café du Canada',
      subtitle:
        'Tim Hortons est l’une des marques de restauration les plus reconnues en Amérique du Nord. Rejoignez un réseau de franchisés qui servent leur communauté chaque jour.',
      alignment: 'left',
      links: [
        { link: { type: 'custom', label: 'Faire une demande', url: '/fr/franchise#inquiry', appearance: 'default' } },
        { link: { type: 'custom', label: 'Comment ça marche', url: '/fr/franchise#process', appearance: 'outline' } },
      ],
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('Devenir propriétaire d’un Tim Hortons', [
        'Les restaurants Tim Hortons sont exploités par des franchisés indépendants qui partagent notre engagement envers le café frais, un service amical et la communauté.',
        'Notre équipe de développement vous accompagne, du choix de l’emplacement jusqu’à l’ouverture et au-delà.',
      ]),
      media: introImage.id,
    },
    {
      blockType: 'doubleImage',
      anchorId: 'why',
      card1: {
        image: whyImageA.id,
        heading: 'Une marque de confiance',
        body: 'Une marque nationale bâtie sur des décennies de confiance et de fidélité de la clientèle.',
      },
      card2: {
        image: whyImageB.id,
        heading: 'Un soutien intégral',
        body: 'Immobilier, formation, marketing et opérations — un accompagnement dès le premier jour.',
      },
    },
    {
      blockType: 'steps',
      anchorId: 'process',
      eyebrow: 'Processus',
      heading: 'Devenir franchisé',
      items: [
        { title: 'Soumettez votre demande', body: 'Parlez-nous de votre parcours, de vos préférences de marché et du capital disponible.' },
        { title: 'Entretien de découverte', body: 'Un gestionnaire en développement présente l’opportunité et répond à vos questions.' },
        { title: 'Demande et approbation', body: 'Complétez la demande formelle; notre équipe évalue finances, expérience et références.' },
        { title: 'Emplacement et formation', body: 'Nous vous aidons à trouver un emplacement et vous suivez notre programme de formation.' },
        { title: 'Ouverture', body: 'Ouvrez votre restaurant avec le soutien continu de votre équipe d’opérations.' },
      ],
    },
    {
      blockType: 'richTextBlock',
      anchorId: 'investment',
      richText: lexicalWithHeading('Investissement et exigences', [
        'L’investissement total pour ouvrir un restaurant Tim Hortons standard se situe généralement entre 500 000 $ et 1,9 M $ selon le format, l’emplacement et les travaux d’aménagement.',
        'Les candidats retenus disposent généralement d’au moins 500 000 $ de capital liquide, d’une expérience démontrée en leadership opérationnel et d’une passion pour le service à la clientèle.',
        'Ces chiffres sont des estimations. Le Document d’information sur la franchise (FDD) remis aux candidats qualifiés contient tous les détails.',
      ]),
    },
    {
      blockType: 'formBlock',
      anchorId: 'inquiry',
      enableIntro: true,
      introContent: lexicalWithHeading('Soumettez votre demande', [
        'Parlez-nous de vous; notre équipe de développement vous contactera si une opportunité correspond à votre profil.',
      ]),
      form: franchiseFormId,
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'FAQ franchisage',
      items: [
        {
          question: 'Dois-je avoir de l’expérience en restauration?',
          answer: lexicalParagraphs([
            'L’expérience en restauration est un atout mais n’est pas obligatoire. Une forte expérience opérationnelle, de leadership ou de service à la clientèle est aussi considérée.',
          ]),
        },
        {
          question: 'Combien de temps prend le processus d’approbation?',
          answer: lexicalParagraphs([
            'De la demande initiale à l’approbation, comptez généralement 3 à 6 mois, plus le temps de sélection d’emplacement et de formation avant l’ouverture.',
          ]),
        },
        {
          question: 'Y a-t-il des frais continus?',
          answer: lexicalParagraphs([
            'Oui — les franchisés versent des redevances et contribuent à un fonds publicitaire national. Les détails complets se trouvent dans le FDD.',
          ]),
        },
        {
          question: 'Puis-je posséder plus d’un restaurant?',
          answer: lexicalParagraphs([
            'Plusieurs de nos meilleurs opérateurs exploitent plusieurs restaurants. Les opportunités multi-unités sont disponibles après une mise en route réussie.',
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
      title: 'Franchise',
      slug: 'franchise',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/franchise and /fr/franchise`)
}
