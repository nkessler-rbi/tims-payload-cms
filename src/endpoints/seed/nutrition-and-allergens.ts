import type { Payload, PayloadRequest } from 'payload'

import { lexicalParagraphs, lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
}

export const seedNutritionAndAllergens = async ({
  payload,
  req,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding Nutrition & Allergens page (EN + FR)...`)

  for (const slug of ['nutrition-and-allergens', 'valeurs-nutritives-et-allergenes']) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } }, req })
  }

  const enLayout: any[] = [
    {
      blockType: 'pageHeader',
      eyebrow: 'Resources',
      title: 'Nutrition & Allergens',
      subtitle: 'Find detailed nutrition information and allergen guidance for our menu.',
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalWithHeading('Know what’s in your order', [
        'We make every effort to keep our nutrition and allergen information accurate and up to date. This page is the source of truth for nutrition and allergen information across our Canadian menu.',
        'Recipes are subject to change. If you have a severe allergy, please confirm with your local restaurant before ordering.',
      ]),
    },
    {
      blockType: 'cardGrid',
      anchorId: 'guides',
      heading: 'Downloadable guides',
      description: 'Open or download the latest reference sheets for our menu.',
      columns: '3',
      items: [
        {
          heading: 'Nutrition guide (PDF)',
          body: 'Full nutrition breakdown for every standard menu item, sorted by category.',
          enableCta: true,
          link: { type: 'custom', label: 'Open guide (PDF)', url: '/files/nutrition-guide.pdf' },
        },
        {
          heading: 'Allergen guide (PDF)',
          body: 'A complete cross-reference of menu items and the 11 priority allergens.',
          enableCta: true,
          link: { type: 'custom', label: 'Open guide (PDF)', url: '/files/allergen-guide.pdf' },
        },
        {
          heading: 'Limited time offers',
          body: 'Allergen and nutrition info for current LTOs, refreshed when the menu changes.',
          enableCta: true,
          link: { type: 'custom', label: 'See LTO sheet', url: '/files/lto-allergens.pdf' },
        },
      ],
    },
    {
      blockType: 'accordion',
      anchorId: 'by-category',
      heading: 'Allergens by category',
      items: [
        {
          question: 'Coffee & beverages',
          answer: lexicalParagraphs([
            'All hot and iced coffees are dairy-free unless cream or milk is added. Specialty beverages such as lattes and cappuccinos contain dairy by default — non-dairy options are available at participating restaurants.',
          ]),
        },
        {
          question: 'Baked goods & donuts',
          answer: lexicalParagraphs([
            'Most baked goods contain wheat and may contain eggs, milk, or soy. Some items contain or are made in facilities that also produce tree nuts and peanuts.',
          ]),
        },
        {
          question: 'Breakfast & lunch',
          answer: lexicalParagraphs([
            'Breakfast sandwiches and wraps typically contain wheat, dairy, and eggs. Most lunch sandwiches contain wheat; some contain dairy, eggs, mustard, or sesame.',
          ]),
        },
        {
          question: 'Cold treats',
          answer: lexicalParagraphs([
            'Iced Capps, frozen drinks, and dessert items typically contain dairy and may contain soy or wheat. Check the allergen guide for product-specific details.',
          ]),
        },
      ],
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalWithHeading('Important notice', [
        'Tim Hortons restaurants are not allergen-free environments. Despite our best efforts, cross-contact may occur due to shared equipment and work spaces. Guests with severe allergies should exercise judgement when ordering. Information is reviewed regularly; last updated 2026.',
      ]),
    },
  ]

  const created = await payload.create({
    collection: 'pages',
    locale: 'en',
    depth: 0,
    req,
    data: {
      title: 'Nutrition & Allergens',
      slug: 'nutrition-and-allergens',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'pageHeader',
      eyebrow: 'Ressources',
      title: 'Valeurs nutritives et allergènes',
      subtitle: 'Consultez les renseignements nutritionnels et les guides allergènes détaillés de notre menu.',
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalWithHeading('Sachez ce que vous commandez', [
        'Nous faisons tous les efforts pour garder ces informations exactes et à jour. Cette page constitue notre source de référence pour la valeur nutritive et les allergènes du menu canadien.',
        'Les recettes peuvent changer. En cas d’allergie grave, veuillez confirmer auprès de votre restaurant local avant de commander.',
      ]),
    },
    {
      blockType: 'cardGrid',
      anchorId: 'guides',
      heading: 'Guides téléchargeables',
      description: 'Ouvrez ou téléchargez les fiches de référence à jour.',
      columns: '3',
      items: [
        {
          heading: 'Guide nutritionnel (PDF)',
          body: 'Ventilation nutritionnelle complète des articles du menu, triée par catégorie.',
          enableCta: true,
          link: { type: 'custom', label: 'Ouvrir le guide (PDF)', url: '/files/guide-nutritionnel.pdf' },
        },
        {
          heading: 'Guide des allergènes (PDF)',
          body: 'Référence complète des articles du menu et des 11 allergènes prioritaires.',
          enableCta: true,
          link: { type: 'custom', label: 'Ouvrir le guide (PDF)', url: '/files/guide-allergenes.pdf' },
        },
        {
          heading: 'Offres à durée limitée',
          body: 'Renseignements sur les allergènes et la valeur nutritive des ODL actuelles.',
          enableCta: true,
          link: { type: 'custom', label: 'Voir la fiche', url: '/files/allergenes-odl.pdf' },
        },
      ],
    },
    {
      blockType: 'accordion',
      anchorId: 'by-category',
      heading: 'Allergènes par catégorie',
      items: [
        {
          question: 'Cafés et boissons',
          answer: lexicalParagraphs([
            'Tous les cafés chauds et glacés sont sans produits laitiers à moins d’ajout de crème ou de lait. Les boissons spécialisées (lattes, cappuccinos) contiennent du lait par défaut — des options sans produits laitiers sont offertes dans les restaurants participants.',
          ]),
        },
        {
          question: 'Produits de boulangerie et beignes',
          answer: lexicalParagraphs([
            'La plupart des produits de boulangerie contiennent du blé et peuvent contenir des œufs, du lait ou du soja. Certains articles contiennent des noix ou des arachides.',
          ]),
        },
        {
          question: 'Déjeuner et dîner',
          answer: lexicalParagraphs([
            'Les sandwichs déjeuner et les wraps contiennent généralement du blé, des produits laitiers et des œufs. Les sandwichs du dîner contiennent du blé; certains contiennent lait, œufs, moutarde ou sésame.',
          ]),
        },
        {
          question: 'Boissons et gâteries glacées',
          answer: lexicalParagraphs([
            'Les Iced Capps, boissons glacées et desserts contiennent généralement des produits laitiers et peuvent contenir du soja ou du blé. Consultez le guide pour les détails.',
          ]),
        },
      ],
    },
    {
      blockType: 'richTextBlock',
      richText: lexicalWithHeading('Avis important', [
        'Les restaurants Tim Hortons ne sont pas des environnements sans allergènes. Malgré nos efforts, des contacts croisés sont possibles en raison du partage d’équipement et d’espaces de travail. Les clients ayant des allergies graves doivent faire preuve de jugement. Dernière mise à jour: 2026.',
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
      title: 'Valeurs nutritives et allergènes',
      slug: 'valeurs-nutritives-et-allergenes',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/nutrition-and-allergens and /fr/valeurs-nutritives-et-allergenes`)
}
