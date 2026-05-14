import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { cateringInquiryForm } from './catering-inquiry-form'
import { franchiseInquiryForm } from './franchise-inquiry-form'
import { accountDeletionForm } from './account-deletion-form'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { seedTimbitSports } from './timbit-sports'
import { seedCatering } from './catering'
import { seedTimsRewards } from './tims-rewards'
import { seedTimsGiftCard } from './tims-gift-card'
import { seedFranchise } from './franchise'
import { seedOurCoffeeStory } from './our-coffee-story'
import { seedNutritionAndAllergens } from './nutrition-and-allergens'
import { seedAboutUs } from './about-us'
import { seedAccountDeletion } from './account-deletion'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post3.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    ...categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding forms...`)

  await payload.create({ collection: 'forms', depth: 0, data: contactFormData })

  const [cateringFormDoc, franchiseFormDoc, accountDeletionFormDoc] = await Promise.all([
    payload.create({ collection: 'forms', depth: 0, data: cateringInquiryForm }),
    payload.create({ collection: 'forms', depth: 0, data: franchiseInquiryForm }),
    payload.create({ collection: 'forms', depth: 0, data: accountDeletionForm }),
  ])

  // Note: legacy 'home' and 'contact-page' seeds were removed because they
  // referenced block configs (Content, MediaBlock, FormBlock, Archive) that
  // are no longer part of the static-page block registry. The home page is
  // a hand-built React landing at /[locale]/page.tsx, and static campaign
  // pages are authored in the admin.

  await seedTimbitSports({
    payload,
    req,
    hockeyImage: image1Doc,
    soccerImage: image2Doc,
    preheaderImage: image3Doc,
  })

  await seedCatering({
    payload,
    req,
    heroImage: image1Doc,
    cardImageA: image1Doc,
    cardImageB: image2Doc,
    cardImageC: image3Doc,
    cateringFormId: cateringFormDoc.id,
  })

  await seedTimsRewards({
    payload,
    req,
    heroImage: image2Doc,
    perkImageA: image1Doc,
    perkImageB: image2Doc,
    perkImageC: image3Doc,
    appImage: image1Doc,
  })

  await seedTimsGiftCard({
    payload,
    req,
    heroImage: image3Doc,
    cardImageA: image1Doc,
    cardImageB: image2Doc,
    cardImageC: image3Doc,
    balanceImage: image2Doc,
  })

  await seedFranchise({
    payload,
    req,
    heroImage: image1Doc,
    introImage: image2Doc,
    whyImageA: image3Doc,
    whyImageB: image1Doc,
    franchiseFormId: franchiseFormDoc.id,
  })

  await seedOurCoffeeStory({
    payload,
    req,
    heroImage: image2Doc,
    storyImageA: image1Doc,
    storyImageB: image2Doc,
    storyImageC: image3Doc,
    galleryImage: image1Doc,
  })

  await seedNutritionAndAllergens({ payload, req })

  await seedAboutUs({
    payload,
    req,
    heroImage: image3Doc,
    missionImage: image1Doc,
    heritageImageA: image2Doc,
    heritageImageB: image3Doc,
  })

  await seedAccountDeletion({
    payload,
    req,
    accountDeletionFormId: accountDeletionFormDoc.id,
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            label: 'About',
            children: [
              { link: { type: 'custom', url: '/en/our-coffee-story', label: 'Our Coffee Story' } },
              { link: { type: 'custom', url: '/en/about-us', label: 'About Us' } },
              { link: { type: 'custom', url: '/en/nutrition-and-allergens', label: 'Nutrition & Allergens' } },
              { link: { type: 'custom', url: '/en/franchise', label: 'Franchise' } },
            ],
          },
          {
            label: 'Rewards & Cards',
            children: [
              { link: { type: 'custom', url: '/en/tims-rewards', label: 'Tims Rewards' } },
              { link: { type: 'custom', url: '/en/tims-gift-card', label: 'Tims Gift Card' } },
            ],
          },
          {
            label: 'Order',
            children: [
              { link: { type: 'custom', url: '/en/catering', label: 'Catering' } },
            ],
          },
          {
            label: 'Help',
            children: [
              { link: { type: 'custom', url: '/en/account-deletion', label: 'Account Deletion' } },
            ],
          },
          {
            label: 'Static Pages',
            link: { type: 'custom', url: '/en/static-pages' },
          },
          {
            label: 'Design System',
            link: { type: 'custom', url: '/en/blocks' },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Source Code',
              newTab: true,
              url: 'https://github.com/payloadcms/payload/tree/3.x/templates/website',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
