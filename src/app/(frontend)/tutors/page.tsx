import type { Metadata } from 'next/types'

import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NextImage from 'next/image'
import Link from 'next/link'
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
      <div className="w-full my-16">
        <div className="max-w-none mx-auto prose md:prose-md dark:prose-invert">
          <h1 className="text-center">導師團隊</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {tutors.docs.map(({ id, name, title, image, meta, slug }, index) => {
          image = meta?.image || image
          if (!image || typeof image === 'string') return null

          return (
            <Link key={id} href={`/tutors/${slug}`} passHref>
              <div className="flex flex-col md:flex-row items-start mb-8 py-4 rounded-lg cursor-pointer">
                <div
                  className={cn('w-full md:w-1/3', {
                    'md:order-1': index % 2 === 0,
                    'md:order-2': index % 2 !== 0,
                  })}
                >
                  <NextImage
                    src={image.url ?? ''}
                    alt={image.alt ?? ''}
                    width={image.width ?? 0}
                    height={image.height ?? 0}
                    className="mx-auto rounded-lg"
                  />
                </div>
                <div
                  className={cn('w-full md:w-2/3 pt-8 md:p-0', {
                    'md:pl-8 md:order-2': index % 2 === 0,
                    'md:pr-8 md:order-1': index % 2 !== 0,
                  })}
                >
                  <h2 className="text-xl font-bold text-primary">{name}</h2>
                  <h3 className="text-lg text-secondary">{title}</h3>
                  <p className="mt-2 text-foreground">{meta?.description}</p>
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
