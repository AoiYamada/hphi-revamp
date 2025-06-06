// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Courses } from './collections/Courses'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import Tutors from './collections/Tutors'
import { Upload } from './collections/Upload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/components/Logo/CmsLogo#default',
        Icon: '@/components/Logo/CmsIcon#default',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: {
      description:
        '專業心理治療(香港)中心 HPHI 是一所為普羅市民提供專業心理輔導服務的機構，並提供一系列的催眠師課程，包括NLP、NGH、PBH 等國際認可的心理治療、催眠課程。',
      title: '專業心理治療及催眠應用（香港）有限公司',
      icons: [
        {
          url: `${getServerSideURL()}/favicon/favicon.ico`,
        },
      ],
      openGraph: {
        description:
          '專業心理治療(香港)中心 HPHI 是一所為普羅市民提供專業心理輔導服務的機構，並提供一系列的催眠師課程，包括NLP、NGH、PBH 等國際認可的心理治療、催眠課程。',
        images: [
          {
            url: `${getServerSideURL()}/hphi-logo-bg.png`,
          },
        ],
        siteName: '專業心理治療及催眠應用（香港）有限公司',
        title: '專業心理治療及催眠應用（香港）有限公司',
      },
      titleSuffix: ' | HPHI',
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [
    Pages,
    Courses,
    Tutors,
    Posts,
    Media,
    Categories,
    Users,
    // Upload
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'no-reply@hphi.com',
    defaultFromName: 'HPHI form submission',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
})
