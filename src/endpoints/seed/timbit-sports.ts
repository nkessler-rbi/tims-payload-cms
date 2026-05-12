import type { Payload, PayloadRequest } from 'payload'

import { lexicalParagraphs, lexicalWithHeading } from '@/blocks/_shared/lexicalSample'

type SeedArgs = {
  payload: Payload
  req: PayloadRequest
  hockeyImage: { id: number | string }
  soccerImage: { id: number | string }
  preheaderImage: { id: number | string }
}

/**
 * Seeds the THCRM-3288 Timbit Sports landing page in EN and FR.
 *
 * Mirrors the ticket exactly:
 *   - Page Header
 *   - Anchor Links (Hockey / Soccer / Registration / FAQs)
 *   - Text With Image (preheader copy + image)
 *   - Double Image (Hockey + Soccer cards)
 *   - Rich Text (Registration body copy)
 *   - Accordion (FAQs)
 *
 * Idempotent — deletes any existing pages with the EN or FR slug first.
 */
export const seedTimbitSports = async ({
  payload,
  req,
  hockeyImage,
  soccerImage,
  preheaderImage,
}: SeedArgs): Promise<void> => {
  payload.logger.info(`— Seeding THCRM-3288 Timbit Sports landing page (EN + FR)...`)

  for (const slug of ['timbits-sports', 'sports-timbits']) {
    await payload.delete({
      collection: 'pages',
      where: { slug: { equals: slug } },
      req,
    })
  }

  const enLayout: any[] = [
    {
      blockType: 'pageHeader',
      title: 'Timbit Sports',
    },
    {
      blockType: 'anchorLinks',
      items: [
        { label: 'Timbits Hockey', targetAnchorId: 'hockey' },
        { label: 'Timbits Soccer', targetAnchorId: 'soccer' },
        { label: 'Registration', targetAnchorId: 'registration' },
        { label: 'FAQs', targetAnchorId: 'faqs' },
      ],
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading('Supporting youth in sports across Canada', [
        'Tims restaurant owners annually support over 300,000 children between 4 to 8 years old by removing financial barriers and providing them access to entry-level organized sports with an emphasis on learning a new game, making new friends, and having fun.',
      ]),
      media: preheaderImage.id,
    },
    {
      blockType: 'doubleImage',
      anchorId: 'hockey',
      card1: {
        image: null,
        heading: 'Our commitment',
        body: 'Tim Hortons is proud to sponsor youth sports in communities across Canada.',
        link: { type: 'custom', label: 'About the program', url: '/en/timbits-sports' },
      },
      card2: {
        image: hockeyImage.id,
        heading: 'Timbits Hockey',
        body: 'Tim Hortons is proud to sponsor youth hockey teams across Canada.',
        link: { type: 'custom', label: 'Learn more', url: '/en/timbits-hockey' },
      },
    },
    {
      blockType: 'textWithImage',
      anchorId: 'soccer',
      mediaPosition: 'left',
      richText: lexicalWithHeading('Timbits Soccer', [
        'Tim Hortons is proud to sponsor youth soccer teams across Canada. Players receive jerseys, socks, shorts, soccer balls and medals — everything they need to learn the game.',
      ]),
      media: soccerImage.id,
      enableCta: true,
      link: { type: 'custom', label: 'Learn more', url: '/en/timbits-soccer', appearance: 'default' },
    },
    {
      blockType: 'richTextBlock',
      anchorId: 'registration',
      richText: lexicalWithHeading(
        'Interested in joining Timbit Sports? Registration is easy!',
        [
          'Your local restaurant owners are excited to sponsor your Timbits team and proud to sponsor youth in sports in communities across Canada.',
          'The Timbits program is available to boys, girls, and co-ed U3-U7 divisions. There is no cost to associations to participate in Timbit Sports.',
          'If you are a parent looking to sign your child up for sport, please reach out to your local soccer or hockey association. Tim Hortons Timbits sponsorship works directly with associations.',
        ],
      ),
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is the Tim Hortons Timbit Sports program?',
          answer: lexicalParagraphs([
            'The Tim Hortons Timbit Sports Program is a community-oriented program that provides opportunities for kids aged four to eight to play house league hockey and soccer.',
            'The philosophy of the program is not based on winning or losing, but on learning a new sport, making new friends and just being a kid.',
          ]),
        },
        {
          question: 'How does my local hockey or soccer association get enrolled?',
          answer: lexicalParagraphs([
            'Registration is easy! Please contact regionalmarketing@timhortons.com with your association details to be considered for sponsorship.',
          ]),
        },
        {
          question: 'What is the ordering process?',
          answer: lexicalParagraphs([
            'Once you order your items, they will arrive within eight weeks. If you need them by a specific date, please include this information when you register.',
          ]),
        },
        {
          question: 'What is the "make-it-right" policy?',
          answer: lexicalParagraphs([
            'If there are any concerns with your jerseys, let your regional marketing manager know. Tim Hortons will replace any items with a quality issue at no cost.',
          ]),
        },
        {
          question: 'What do our players receive from Timbit Sports?',
          answer: lexicalParagraphs([
            'Hockey players typically receive jerseys, socks, and medals.',
            'Soccer players typically receive jerseys, socks, shorts, soccer balls, and medals.',
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
      title: 'Timbit Sports',
      slug: 'timbits-sports',
      _status: 'published',
      hero: { type: 'none' } as any,
      layout: enLayout,
    },
  })

  const frLayout: any[] = [
    {
      blockType: 'pageHeader',
      title: 'Sports Timbit',
    },
    {
      blockType: 'anchorLinks',
      items: [
        { label: 'Hockey Timbits', targetAnchorId: 'hockey' },
        { label: 'Soccer Timbits', targetAnchorId: 'soccer' },
        { label: 'Enregistrement', targetAnchorId: 'registration' },
        { label: 'FAQ', targetAnchorId: 'faqs' },
      ],
    },
    {
      blockType: 'textWithImage',
      mediaPosition: 'right',
      richText: lexicalWithHeading(
        'On soutient des jeunes partout au pays dans leurs premiers pas sportifs.',
        [
          'Les propriétaires de restaurant Tim Hortons offrent annuellement leur appui à plus de 300 000 jeunes de 4 à 8 ans en éliminant les obstacles financiers et en leur donnant accès à des programmes de sport organisé de niveau débutant qui mettent l’accent sur le plaisir de pratiquer un nouveau sport et de se faire de nouveaux amis.',
        ],
      ),
      media: preheaderImage.id,
    },
    {
      blockType: 'doubleImage',
      anchorId: 'hockey',
      card1: {
        image: null,
        heading: 'Notre engagement',
        body: 'Tim Hortons est fier de commanditer le sport junior dans des communautés partout au Canada.',
        link: { type: 'custom', label: 'À propos du programme', url: '/fr/sports-timbits' },
      },
      card2: {
        image: hockeyImage.id,
        heading: 'Hockey Timbits',
        body: 'Tim Hortons est fier de commanditer les équipes de hockey junior partout au Canada.',
        link: { type: 'custom', label: 'En savoir plus', url: '/fr/hockey-timbits' },
      },
    },
    {
      blockType: 'textWithImage',
      anchorId: 'soccer',
      mediaPosition: 'left',
      richText: lexicalWithHeading('Soccer Timbits', [
        'Tim Hortons est fier de commanditer les équipes de soccer junior partout au Canada. Les joueurs reçoivent chandails, bas, shorts, ballons de soccer et médailles — tout ce qu’il faut pour apprendre.',
      ]),
      media: soccerImage.id,
      enableCta: true,
      link: { type: 'custom', label: 'En savoir plus', url: '/fr/soccer-timbits', appearance: 'default' },
    },
    {
      blockType: 'richTextBlock',
      anchorId: 'registration',
      richText: lexicalWithHeading(
        'Vous souhaitez vous joindre au programme des Sports Timbits? L’inscription est facile!',
        [
          'Vos propriétaires de restaurant locaux sont ravis et fiers de commanditer vos équipes Timbits ainsi que des jeunes sportifs issus de communautés d’un bout à l’autre du pays.',
          'Le programme Timbits est offert aux divisions de garçons, de filles, ainsi qu’aux divisions mixtes. Les joueurs doivent être âgés de trois à sept ans. Les associations qui souhaitent participer au programme des Sports Timbits peuvent le faire gratuitement.',
          'Si vous êtes un parent qui souhaite inscrire son enfant à un sport, veuillez contacter votre association locale de soccer ou de hockey. La commandite de Tim Hortons Timbits travaille directement avec les associations.',
        ],
      ),
    },
    {
      blockType: 'accordion',
      anchorId: 'faqs',
      heading: 'Foire aux questions',
      items: [
        {
          question: 'Qu’est-ce que le programme des Sports Timbits de Tim Hortons?',
          answer: lexicalParagraphs([
            'Le programme des Sports Timbits est un programme axé sur la communauté qui offre à des enfants âgés de quatre à huit ans la possibilité de s’amuser dans des équipes de hockey et de soccer récréatives.',
            'Ce programme ne met pas l’accent sur la victoire, mais bien sur la pratique d’un nouveau sport, la rencontre de nouveaux amis et le fait de laisser des enfants être simplement des enfants.',
          ]),
        },
        {
          question: 'Comment inscrire mon association locale de hockey ou de soccer?',
          answer: lexicalParagraphs([
            'L’inscription est facile! Veuillez envoyer les renseignements suivants à regionalmarketing@timhortons.com pour que votre candidature soit prise en compte en vue d’un parrainage.',
          ]),
        },
        {
          question: 'Quel est le processus de commande?',
          answer: lexicalParagraphs([
            'Lorsque vous aurez commandé vos articles, prévoyez jusqu’à huit semaines avant de les recevoir.',
          ]),
        },
        {
          question: 'Quelle est la politique d’assurance-qualité?',
          answer: lexicalParagraphs([
            'En cas de problème avec vos chandails, n’hésitez pas à en parler à votre gestionnaire du marketing régional. Tim Hortons remplacera les articles défectueux sans frais.',
          ]),
        },
        {
          question: 'Quels articles nos joueurs reçoivent-ils dans le cadre du programme Sports Timbits?',
          answer: lexicalParagraphs([
            'Hockey : les articles les plus courants sont les chandails, les bas et les médailles.',
            'Soccer : les articles les plus courants sont les chandails, les bas, les shorts, les ballons de soccer et les médailles.',
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
      title: 'Sports Timbit',
      slug: 'sports-timbits',
      layout: frLayout,
    },
  })

  payload.logger.info(`  ✓ Seeded /en/timbits-sports and /fr/sports-timbits`)
}
