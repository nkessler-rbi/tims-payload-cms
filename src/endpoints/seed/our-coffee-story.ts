import type { Payload, PayloadRequest } from 'payload'

import { lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
  heroImage: { id: number | string }
  storyImageA: { id: number | string }
  storyImageB: { id: number | string }
  storyImageC: { id: number | string }
  galleryImage: { id: number | string }
}

export const seedOurCoffeeStory = async ({
  payload,
  req,
  heroImage,
  storyImageA,
  storyImageB,
  storyImageC,
  galleryImage,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding Our Coffee Story page (EN + FR)...`)

  for (const slug of ['our-coffee-story', 'notre-histoire-de-cafe']) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, req })
  }

  const enLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'Our Coffee Story',
      title: 'Always fresh. Always Tims.',
      subtitle: 'Every cup of Tim Hortons coffee starts with the same promise: 100% premium Arabica beans, freshly brewed and served with care.',
      alignment: 'center',
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('The bean', [
        'We source 100% premium Arabica beans from coffee-growing regions across South and Central America. Each bean is selected for the balanced, smooth flavour that defines our signature blend.',
      ]),
      media: storyImageA.id,
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'left',
      richText: lexicalWithHeading('The roast', [
        'Our coffee is roasted in small batches by master roasters who oversee every step. The result is a consistent, medium-roast profile that tastes like home — every time.',
      ]),
      media: storyImageB.id,
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('The brew', [
        'Every pot is brewed fresh at your local Tim Hortons and held no longer than 20 minutes. After that, we start a fresh pot. That commitment is the difference you can taste in every cup.',
      ]),
      media: storyImageC.id,
    },
    {
      blockType: 'doubleImage',
      card1: {
        image: storyImageA.id,
        heading: 'Sourced with care',
        body: 'We partner with farmers and cooperatives we have known for years, supporting communities at the source.',
      },
      card2: {
        image: storyImageB.id,
        heading: 'Roasted to order',
        body: 'Roasted in small, frequent batches so every shipment to restaurants is as fresh as possible.',
      },
    },
    {
      blockType: 'imageBlock',
      media: galleryImage.id,
      caption: 'A morning in a Tim Hortons roastery.',
    },
    {
      blockType: 'cta',
      richText: lexicalWithHeading('Bring it home', [
        'Tim Hortons coffee is available in bags, pods, and cans — wherever you shop for groceries.',
      ]),
      links: [
        { link: { type: 'custom', label: 'Find it in stores', url: '/en/at-home', appearance: 'default' } },
      ],
    },
  ]

  const created = await payload.create({
    collection: 'pages',
    locale: 'en',
    depth: 0,
    req,
    data: {
      title: 'Our Coffee Story',
      slug: 'our-coffee-story',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'heroBanner',
      backgroundImage: heroImage.id,
      eyebrow: 'Notre histoire de café',
      title: 'Toujours frais. Toujours Tims.',
      subtitle: 'Chaque tasse de café Tim Hortons commence avec la même promesse: 100 % de grains arabica de qualité supérieure, fraîchement infusés et servis avec soin.',
      alignment: 'center',
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('Le grain', [
        'Nous sélectionnons 100 % de grains arabica de qualité supérieure issus de régions d’Amérique du Sud et centrale. Chaque grain est choisi pour la saveur équilibrée et douce de notre mélange signature.',
      ]),
      media: storyImageA.id,
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'left',
      richText: lexicalWithHeading('La torréfaction', [
        'Notre café est torréfié en petites quantités par des maîtres torréfacteurs qui surveillent chaque étape. Le résultat: un profil de torréfaction moyenne, constant — un goût de chez-soi à chaque tasse.',
      ]),
      media: storyImageB.id,
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('L’infusion', [
        'Chaque cafetière est préparée fraîchement à votre Tim Hortons local et conservée 20 minutes au maximum. Passé ce délai, nous lançons une nouvelle infusion. C’est notre promesse fraîcheur.',
      ]),
      media: storyImageC.id,
    },
    {
      blockType: 'doubleImage',
      card1: {
        image: storyImageA.id,
        heading: 'Approvisionnement responsable',
        body: 'Nous travaillons avec des fermiers et coopératives partenaires depuis des années, soutenant les communautés à la source.',
      },
      card2: {
        image: storyImageB.id,
        heading: 'Torréfaction sur mesure',
        body: 'Torréfié en petites quantités, fréquemment, pour livrer aux restaurants un café aussi frais que possible.',
      },
    },
    {
      blockType: 'imageBlock',
      media: galleryImage.id,
      caption: 'Une matinée dans une torréfaction Tim Hortons.',
    },
    {
      blockType: 'cta',
      richText: lexicalWithHeading('À la maison', [
        'Le café Tim Hortons est offert en sacs, capsules et boîtes — où vous faites vos courses.',
      ]),
      links: [
        { link: { type: 'custom', label: 'Trouvez-le en épicerie', url: '/fr/a-la-maison', appearance: 'default' } },
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
      title: 'Notre histoire de café',
      slug: 'notre-histoire-de-cafe',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/our-coffee-story and /fr/notre-histoire-de-cafe`)
}
