import type { Metadata } from 'next/types'

import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NextImage from 'next/image'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { cn } from '@/utilities'
import { priority } from 'next-sitemap.config.cjs'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config })

  const tutors = await payload.find({
    collection: 'tutors',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    select: {
      _id: true,
      name: true,
      title: true,
      image: true,
      meta: true,
      slug: true,
      priority: true,
    },
    // sort: ['-priority'],
    sort: ['priority'],
  })

  return (
    <MaxWidthWrapper className="pb-24">
      <PageHeader kicker="Our Team" title="導師團隊" align="center" className="my-16 md:my-24" />

      <div className="mx-auto flex max-w-4xl flex-col gap-12 md:gap-16">
        {tutors.docs.map(({ id, name, title, image, meta, slug }, index) => {
          image = meta?.image || image
          if (!image || typeof image === 'string') return null
          const isEven = index % 2 === 0

          return (
            <Link key={id} href={`/tutors/${slug}`} className="group block">
              <div
                className={cn(
                  'flex flex-col gap-6 md:flex-row md:items-center md:gap-12 lg:gap-16',
                  !isEven && 'md:flex-row-reverse',
                )}
              >
                <div className="w-44 shrink-0 overflow-hidden rounded-sm md:w-60">
                  <NextImage
                    src={image.url ?? ''}
                    alt={image.alt ?? ''}
                    width={image.width ?? 0}
                    height={image.height ?? 0}
                    className="h-auto w-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-2 font-sans text-[13px] font-medium tracking-[0.2em] text-iris">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-serif text-2xl font-bold leading-tight text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 md:text-3xl/9 lg:text-4xl/10">
                    {name}
                  </h2>
                  <p className="mt-2 font-sans text-lg text-iris">{title}</p>
                  {meta?.description && (
                    <p className="mt-4 max-w-prose font-sans leading-relaxed text-ink-soft">
                      {meta.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </MaxWidthWrapper>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `導師團隊 | 專業心理治療及催眠應用（香港）有限公司`,
    description: '專業心理治療及催眠應用（香港）有限公司的導師團隊',
  }
}
