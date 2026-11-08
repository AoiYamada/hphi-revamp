import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Post } from '@/payload-types'
import { Search } from '@/search/Component'
import { CardPostData } from '@/components/Card'
import { PageHeader } from '@/components/PageHeader'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    // Buggy, search plugin doesn't populate the categories field
    // collection: 'search',
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <MaxWidthWrapper className="py-16 md:py-24">
      <PageHeader kicker="Search" title="文章搜尋" align="center" className="mb-12 md:mb-16">
        <div className="mt-8">
          <Search />
        </div>
      </PageHeader>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="mx-auto max-w-md rounded-sm border border-line bg-paper-sunken px-6 py-10 text-center text-ink-faint">
          找不到文章
        </div>
      )}
    </MaxWidthWrapper>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `搜尋文章 | 專業心理治療及催眠應用（香港）有限公司`,
  }
}
