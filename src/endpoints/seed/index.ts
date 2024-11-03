import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `pnpm seed` locally instead of using the admin UI within an active app
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
  // this is because while `pnpm seed` drops the database
  // the custom `/api/seed` endpoint does not

  payload.logger.info(`— Clearing media...`)

  const mediaDir = path.resolve(dirname, '../../public/media')
  if (fs.existsSync(mediaDir)) {
    fs.rmdirSync(mediaDir, { recursive: true })
  }

  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  for (const global of globals) {
    switch (global) {
      case 'header':
        await payload.updateGlobal({
          slug: global,
          data: {
            tabs: [],
          },
          req,
        })
        break
      case 'footer':
        await payload.updateGlobal({
          slug: global,
          data: {
            columns: [],
          },
          req,
        })
        break
    }
  }

  for (const collection of collections) {
    await payload.delete({
      collection: collection,
      where: {
        id: {
          exists: true,
        },
      },
      req,
    })
  }

  const pages = await payload.delete({
    collection: 'pages',
    where: {},
    req,
  })

  console.log({ pages })

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: 'demo-author@payloadcms.com',
      },
    },
    req,
  })

  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      name: 'Demo Author',
      email: 'demo-author@payloadcms.com',
      password: 'password',
    },
    req,
  })

  let demoAuthorID: number | string = demoAuthor.id

  payload.logger.info(`— Seeding media...`)
  const image1Doc = await payload.create({
    collection: 'media',
    data: image1,
    filePath: path.resolve(dirname, 'image-post1.webp'),
    req,
  })
  const image2Doc = await payload.create({
    collection: 'media',
    data: image2,
    filePath: path.resolve(dirname, 'image-post2.webp'),
    req,
  })
  const image3Doc = await payload.create({
    collection: 'media',
    data: image2,
    filePath: path.resolve(dirname, 'image-post3.webp'),
    req,
  })
  const imageHomeDoc = await payload.create({
    collection: 'media',
    data: image2,
    filePath: path.resolve(dirname, 'image-hero1.webp'),
    req,
  })

  payload.logger.info(`— Seeding categories...`)
  const technologyCategory = await payload.create({
    collection: 'categories',
    data: {
      title: 'Technology',
    },
    req,
  })

  const newsCategory = await payload.create({
    collection: 'categories',
    data: {
      title: 'News',
    },
    req,
  })

  const financeCategory = await payload.create({
    collection: 'categories',
    data: {
      title: 'Finance',
    },
    req,
  })

  await payload.create({
    collection: 'categories',
    data: {
      title: 'Design',
    },
    req,
  })

  await payload.create({
    collection: 'categories',
    data: {
      title: 'Software',
    },
    req,
  })

  await payload.create({
    collection: 'categories',
    data: {
      title: 'Engineering',
    },
    req,
  })

  let image1ID: number | string = image1Doc.id
  let image2ID: number | string = image2Doc.id
  let image3ID: number | string = image3Doc.id
  let imageHomeID: number | string = imageHomeDoc.id

  if (payload.db.defaultIDType === 'text') {
    image1ID = `"${image1Doc.id}"`
    image2ID = `"${image2Doc.id}"`
    image3ID = `"${image3Doc.id}"`
    imageHomeID = `"${imageHomeDoc.id}"`
    demoAuthorID = `"${demoAuthorID}"`
  }

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post1, categories: [technologyCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image1ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
    req,
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post2, categories: [newsCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image2ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image3ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
    req,
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post3, categories: [financeCategory.id] })
        .replace(/"\{\{IMAGE_1\}\}"/g, String(image3ID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image1ID))
        .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID)),
    ),
    req,
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
    req,
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
    req,
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
    req,
  })

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/"\{\{IMAGE_1\}\}"/g, String(imageHomeID))
        .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID)),
    ),
    req,
  })

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    data: JSON.parse(JSON.stringify(contactFormData)),
    req,
  })

  let contactFormID: number | string = contactForm.id

  if (payload.db.defaultIDType === 'text') {
    contactFormID = `"${contactFormID}"`
  }

  payload.logger.info(`— Seeding contact page...`)

  const contactPage = await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(contactPageData).replace(/"\{\{CONTACT_FORM_ID\}\}"/g, String(contactFormID)),
    ),
    req,
  })

  payload.logger.info(`— Seeding header...`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      tabs: [
        {
          label: 'Use Cases',
          enableDirectLink: true,
          enableDropdown: true,
          link: {
            type: 'custom',
            url: '/use-cases',
          },
          navItems: [
            {
              style: 'default',
              defaultLink: {
                link: {
                  type: 'custom',
                  url: '/use-cases/headless-cms',
                  label: 'Content Management System',
                },
                description:
                  'Create with a minimal, powerful editing experience. Extend effortlessly.',
              },
            },
            {
              style: 'default',
              defaultLink: {
                link: {
                  type: 'custom',
                  url: '/use-cases/enterprise-app-builder',
                  label: 'Enterprise App Builder',
                },
                description:
                  'Build sophisticated enterprise tools while reducing development costs.',
              },
            },
            {
              style: 'default',
              defaultLink: {
                link: {
                  type: 'custom',
                  url: '/use-cases/headless-ecommerce',
                  label: 'Headless E-commerce',
                },
                description:
                  'Manage all your content, alongside your products, in a single, powerful editing experience.',
              },
            },
            {
              style: 'default',
              defaultLink: {
                link: {
                  type: 'custom',
                  url: '/use-cases/digital-asset-management',
                  label: 'Digital Asset Management',
                },
                description:
                  'Ensure brand consistency by seamlessly managing digital assets within your CMS.',
              },
            },
          ],
        },
        {
          label: 'Why Payload',
          enableDirectLink: false,
          enableDropdown: true,
          navItems: [
            {
              style: 'default',
              defaultLink: {
                link: {
                  type: 'custom',
                  url: '/marketers',
                  label: 'For Marketing Teams',
                },
                description:
                  'Advanced features like Visual Editing and Live Preview are giving a head back to the headless CMS.',
              },
            },
            {
              style: 'default',
              defaultLink: {
                link: {
                  type: 'custom',
                  url: '/become-a-partner',
                  label: 'For Agencies',
                },
                description:
                  'Learn how Payload delivers for software consultancies with a content framework that can build anything.',
              },
            },
            {
              style: 'default',
              defaultLink: {
                link: {
                  type: 'custom',
                  url: '/developers',
                  label: 'For Developers',
                },
                description:
                  'Built with React & TypeScript, depart restrictive “no-code” options and write code you’re proud of.',
              },
            },
          ],
        },
        {
          label: 'Developers',
          enableDirectLink: true,
          enableDropdown: true,
          link: {
            type: 'custom',
            url: '/developers',
          },
          navItems: [
            {
              style: 'list',
              listLinks: {
                label: 'Resources',
                links: [
                  {
                    link: {
                      type: 'custom',
                      url: '/docs',
                      label: 'Documentation',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: 'https://github.com/payloadcms/payload/tree/main/examples',
                      label: 'Examples',
                      newTab: true,
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: 'https://github.com/payloadcms/payload/tree/main/templates',
                      label: 'Templates',
                      newTab: true,
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: 'https://github.com/payloadcms/payload',
                      label: 'GitHub',
                      newTab: true,
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/blog',
                      label: 'Blog',
                    },
                  },
                ],
              },
            },
            {
              style: 'list',
              listLinks: {
                label: 'Community',
                links: [
                  {
                    link: {
                      type: 'custom',
                      url: 'https://github.com/payloadcms/payload/discussions/categories/roadmap',
                      label: 'Roadmap',
                      newTab: true,
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: 'https://discord.com/invite/r6sCXqVk3v',
                      label: 'Discord',
                      newTab: true,
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/community-help',
                      label: 'Community Help',
                    },
                  },
                ],
              },
            },
            {
              style: 'featured',
              featuredLink: {
                label: 'Payload Cloud',
                content: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'Deploy your entire stack in one place with Payload Cloud.',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'paragraph',
                        version: 1,
                        textFormat: 0,
                        textStyle: '',
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
                links: [
                  {
                    link: {
                      type: 'custom',
                      url: '/login',
                      label: 'Login',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/cloud-pricing',
                      label: 'Cloud Pricing',
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          label: 'Enterprise',
          enableDirectLink: true,
          enableDropdown: true,
          link: {
            type: 'custom',
            url: '/enterprise',
          },
          navItems: [
            {
              style: 'list',
              listLinks: {
                label: 'Enterprise Features',
                links: [
                  {
                    link: {
                      type: 'custom',
                      url: '/enterprise/single-sign-on-sso',
                      label: 'SSO',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/enterprise/publishing-workflows',
                      label: 'Publishing Workflows',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/enterprise/visual-editor',
                      label: 'Visual Editor',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/enterprise/headless-ab-variant-testing',
                      label: 'Static A/B testing',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/enterprise/enterprise-ai',
                      label: 'AI features',
                    },
                  },
                ],
              },
            },
            {
              style: 'list',
              listLinks: {
                label: 'Customer Stories',
                links: [
                  {
                    link: {
                      type: 'custom',
                      url: '/case-studies/microsoft',
                      label: 'Microsoft',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/case-studies/blue-origin-club-for-the-future',
                      label: 'Blue Origin',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/case-studies/hello-bello',
                      label: 'Hello Bello',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/case-studies/mythical-society',
                      label: 'Mythical Society',
                    },
                  },
                  {
                    link: {
                      type: 'custom',
                      url: '/case-studies/tekton',
                      label: 'Tekton',
                    },
                  },
                ],
              },
            },
            {
              style: 'featured',
              featuredLink: {
                label: 'Featured Customer Story',
                content: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'Microsoft chose Payload to tell the world about AI.',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'paragraph',
                        version: 1,
                        textFormat: 0,
                        textStyle: '',
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
                links: [
                  {
                    link: {
                      type: 'custom',
                      url: '/case-studies/microsoft',
                      label: 'Read the case study',
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          label: 'Docs',
          enableDirectLink: true,
          enableDropdown: false,
          link: {
            type: 'custom',
            url: '/docs',
          },
        },
      ],
    },
    req,
  })

  payload.logger.info(`— Seeding footer...`)

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: [
        {
          label: '其他課程',
          enableDirectLink: true,
          link: {
            type: 'custom',
            url: '/courses',
          },
          navItems: [
            {
              link: {
                type: 'custom',
                url: 'https://www.hk-hphi.com/%E5%9F%BA%E7%A4%8E%E5%82%AC%E7%9C%A0%E6%B2%BB%E7%99%82%E5%AD%B8%E8%AD%89%E6%9B%B8%E8%AA%B2%E7%A8%8B',
                label: '基礎催眠治療學證書課程',
              },
            },
            {
              link: {
                type: 'custom',
                url: 'https://www.hk-hphi.com/%E7%BE%8E%E5%9C%8B%E8%A8%BB%E5%86%8A%E5%82%AC%E7%9C%A0%E6%B2%BB%E7%99%82%E5%B8%AB%E8%AA%B2%E7%A8%8C-abh-ngh',
                label: '美國註冊催眠治療師課程',
              },
            },
            {
              link: {
                type: 'custom',
                url: 'https://www.hk-hphi.com/%E6%B7%B1%E5%8C%96%E5%82%AC%E7%9C%A0%E5%B0%88%E6%A5%AD%E8%AA%8D%E8%AD%89%E8%AA%B2%E7%A8%8C-imdha',
                label: '深化催眠專業認證課程',
              },
            },
            {
              link: {
                type: 'custom',
                url: 'https://www.hk-hphi.com/ibnlp%E5%9F%B7%E8%A1%8C%E5%B8%AB%E8%AA%B2%E7%A8%8B',
                label: 'NLP 執行師證書課程',
              },
            },
          ],
        },
        {
          label: '聯絡我們',
          enableDirectLink: true,
          link: {
            type: 'custom',
            url: '/contact',
          },
          navItems: [
            {
              icon: 'whatsapp',
              link: {
                type: 'custom',
                url: 'https://wa.me/85290469438',
                label: '+852 9046 9438',
              },
            },
            {
              icon: 'whatsapp',
              link: {
                type: 'custom',
                url: 'https://wa.me/85293098317',
                label: '+852 9309 8317',
              },
            },
            {
              icon: 'instagram',
              link: {
                type: 'custom',
                url: 'https://www.instagram.com/hphi_psychotherapy',
                label: '@hphi_psychotherapy',
              },
            },
            {
              icon: 'youtube',
              link: {
                type: 'custom',
                url: 'https://www.youtube.com/@know.the.inside',
                label: '潛意識達人',
              },
            },
            {
              icon: 'facebook',
              link: {
                type: 'custom',
                url: 'https://www.facebook.com/hphi.health',
                label: '專業心理治療及催眠應用中心',
              },
            },
            {
              icon: 'mail',
              link: {
                type: 'custom',
                url: 'mailto:info@hk-hphi.com">info@hk-hphi.com',
                label: 'info@hk-hphi.com',
              },
            },
            {
              icon: 'phone',
              link: {
                type: 'custom',
                url: 'tel:35007168',
                label: '35007168 (熱線)',
              },
            },
            {
              icon: 'phone',
              link: {
                type: 'custom',
                url: 'tel:26261828',
                label: '26261828 (催眠課程專線)',
              },
            },
          ],
        },
      ],
    },
    req,
  })

  payload.logger.info('Seeded database successfully!')
}
