import type { Payload, PayloadRequest } from 'payload'

import { lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
  heroImage: { id: number | string }
  missionImage: { id: number | string }
  heritageImageA: { id: number | string }
  heritageImageB: { id: number | string }
}

export const seedAboutUs = async ({
  payload,
  req,
  heroImage,
  missionImage,
  heritageImageA,
  heritageImageB,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding About Us page (EN + FR)...`)

  for (const slug of ['about-us', 'a-propos']) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, req })
  }

  const enLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'About Tim Hortons',
      title: 'Always Canadian. Always welcoming.',
      subtitle: 'For more than 60 years, Tim Hortons has been part of the everyday rhythm of communities across Canada and beyond.',
      alignment: 'left',
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('Our mission', [
        'To deliver the great-tasting coffee, fresh-baked goods, and warm welcome that makes Tim Hortons part of our guests’ daily lives.',
        'Wherever we go, we’re proud to be part of the community.',
      ]),
      media: missionImage.id,
    },
    {
      blockType: 'doubleImage',
      anchorId: 'heritage',
      card1: {
        image: heritageImageA.id,
        heading: '1964 — A first restaurant',
        body: 'The first Tim Hortons opened in Hamilton, Ontario, with a simple promise: great coffee and a friendly welcome.',
      },
      card2: {
        image: heritageImageB.id,
        heading: 'Today — Across Canada and beyond',
        body: 'From small towns to big cities, Tim Hortons restaurants serve millions of guests every day.',
      },
    },
    {
      blockType: 'cardGrid',
      anchorId: 'values',
      heading: 'What we stand for',
      columns: '3',
      items: [
        {
          heading: 'Community first',
          body: 'Our restaurants are local — owned and operated by people who live in the neighbourhoods they serve.',
        },
        {
          heading: 'Quality every day',
          body: 'Fresh-brewed coffee, scratch-made breakfast, and warm baked goods — every shift, every guest.',
        },
        {
          heading: 'Welcoming for everyone',
          body: 'We believe a great Tim Hortons run starts with a friendly hello and a smile.',
        },
      ],
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalWithHeading('Tim Hortons Foundation', [
        'Through the Tim Hortons Foundation Camps, restaurant owners help kids from underserved communities discover their strength, build their confidence, and dream bigger. Since 1974, more than 320,000 youth have attended a Tims Camp at no cost to their families.',
      ]),
    },
    {
      blockType: 'cta',
      richText: lexicalWithHeading('Join the team', [
        'Whether you’re looking for a part-time shift or a long-term career, there’s a place for you at Tim Hortons.',
      ]),
      links: [
        { link: { type: 'custom', label: 'See open roles', url: '/en/careers', appearance: 'default' } },
        { link: { type: 'custom', label: 'Become a franchisee', url: '/en/franchise', appearance: 'outline' } },
      ],
    },
  ]

  const created = await payload.create({
    collection: 'pages',
    locale: 'en',
    depth: 0,
    req,
    data: {
      title: 'About Us',
      slug: 'about-us',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'À propos de Tim Hortons',
      title: 'Toujours canadien. Toujours accueillant.',
      subtitle: 'Depuis plus de 60 ans, Tim Hortons fait partie du quotidien des communautés au Canada et ailleurs.',
      alignment: 'left',
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('Notre mission', [
        'Offrir un café savoureux, des produits de boulangerie frais et un accueil chaleureux qui font de Tim Hortons une partie du quotidien de nos clients.',
        'Où que nous allions, nous sommes fiers de faire partie de la communauté.',
      ]),
      media: missionImage.id,
    },
    {
      blockType: 'doubleImage',
      anchorId: 'heritage',
      card1: {
        image: heritageImageA.id,
        heading: '1964 — Un premier restaurant',
        body: 'Le premier Tim Hortons a ouvert à Hamilton, en Ontario, avec une promesse simple: un bon café et un accueil amical.',
      },
      card2: {
        image: heritageImageB.id,
        heading: 'Aujourd’hui — Partout au Canada et au-delà',
        body: 'Des petites villes aux grandes métropoles, nos restaurants servent des millions de clients chaque jour.',
      },
    },
    {
      blockType: 'cardGrid',
      anchorId: 'values',
      heading: 'Nos valeurs',
      columns: '3',
      items: [
        {
          heading: 'La communauté d’abord',
          body: 'Nos restaurants sont locaux — exploités par des gens qui habitent les quartiers qu’ils servent.',
        },
        {
          heading: 'La qualité chaque jour',
          body: 'Café fraîchement infusé, déjeuners préparés sur place, produits de boulangerie chauds — à chaque quart de travail.',
        },
        {
          heading: 'Accueillants pour tous',
          body: 'Une visite chez Tim Hortons commence toujours par un bonjour amical et un sourire.',
        },
      ],
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalWithHeading('Fondation Tim Hortons', [
        'Grâce aux Camps de la Fondation Tim Hortons, les propriétaires de restaurants aident les jeunes des communautés mal desservies à découvrir leurs forces, à gagner confiance en eux et à voir plus grand. Depuis 1974, plus de 320 000 jeunes ont participé à un Camp Tims, sans frais pour leur famille.',
      ]),
    },
    {
      blockType: 'cta',
      richText: lexicalWithHeading('Joignez-vous à l’équipe', [
        'Que vous cherchiez un emploi à temps partiel ou une carrière à long terme, il y a une place pour vous chez Tim Hortons.',
      ]),
      links: [
        { link: { type: 'custom', label: 'Voir les postes', url: '/fr/carrieres', appearance: 'default' } },
        { link: { type: 'custom', label: 'Devenir franchisé', url: '/fr/franchise', appearance: 'outline' } },
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
      title: 'À propos',
      slug: 'a-propos',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/about-us and /fr/a-propos`)
}
