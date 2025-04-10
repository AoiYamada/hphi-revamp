import { getPayload } from 'payload'
import config from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { cache } from 'react'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RichText from '@/components/RichText'
import NextImage from 'next/image'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const tutors = await payload.find({
    collection: 'tutors',
    limit: 100,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = tutors.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Tutor({ params: paramsPromise }: Args) {
  let { slug = '' } = await paramsPromise
  slug = decodeURIComponent(slug)

  const url = '/tutors/' + slug
  const tutor = await queryTutorBySlug({ slug })

  if (!tutor) return <PayloadRedirects url={url} />
  if (typeof tutor.image !== 'object') return null

  return (
    <MaxWidthWrapper>
      <article className="pt-8 pb-16">
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8">
          <div className="md:w-1/2 space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-primary">{tutor.name}</h1>
              <h2 className="text-2xl font-semibold text-secondary">{tutor.title}</h2>
            </div>
            <NextImage
              src={tutor.image.url ?? ''}
              alt={tutor.image.alt ?? ''}
              width={tutor.image.width ?? 0}
              height={tutor.image.height ?? 0}
              className="max-w-lg rounded-lg border border-border md:hidden"
            />
            <RichText data={tutor.description} enableGutter={false} />
          </div>
          <div className="md:w-1/2 flex flex-col items-start space-y-4">
            <NextImage
              src={tutor.image.url ?? ''}
              alt={tutor.image.alt ?? ''}
              width={tutor.image.width ?? 0}
              height={tutor.image.height ?? 0}
              className="max-w-lg rounded-lg border border-border hidden md:block"
            />
            <h2 className="text-2xl font-semibold text-secondary">專業資格</h2>
            <RichText data={tutor.qualifications} enableGutter={false} className="mx-0" />
          </div>
        </div>
      </article>
    </MaxWidthWrapper>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  let { slug = '' } = await paramsPromise
  slug = decodeURIComponent(slug)

  const tutor = await queryTutorBySlug({ slug })

  return generateMeta({ doc: tutor })
}

const queryTutorBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'tutors',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
