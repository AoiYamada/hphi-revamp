import { getPayload } from 'payload'
import config from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'
import { Metadata } from 'next'
import { cache } from 'react'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { PageHeader } from '@/components/PageHeader'
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
      <article className="py-16 md:py-24">
        <PayloadRedirects disableNotFound url={url} />

        <PageHeader kicker="導師" title={tutor.name} className="mb-12">
          <p className="mt-2 font-sans text-xl text-iris md:text-2xl">{tutor.title}</p>
        </PageHeader>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-sm border border-line">
              <NextImage
                src={tutor.image.url ?? ''}
                alt={tutor.image.alt ?? ''}
                width={tutor.image.width ?? 0}
                height={tutor.image.height ?? 0}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-ink">關於導師</h2>
              <RichText
                data={tutor.description}
                enableGutter={false}
                className="prose max-w-none"
              />
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold text-ink">專業資格</h2>
              <RichText
                data={tutor.qualifications}
                enableGutter={false}
                className="prose max-w-none"
              />
            </section>
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
