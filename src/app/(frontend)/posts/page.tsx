import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageHeader } from '@/components/PageHeader'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
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
  })

  return (
    <MaxWidthWrapper className="py-16 md:py-24">
      <PageHeader kicker="Articles" title="文章列表" className="mb-12 md:mb-16" />

      <PageRange
        className="mb-8"
        collection="posts"
        currentPage={posts.page}
        limit={12}
        totalDocs={posts.totalDocs}
      />

      <CollectionArchive posts={posts.docs} />

      {posts.totalPages > 1 && posts.page && (
        <Pagination page={posts.page} totalPages={posts.totalPages} />
      )}
    </MaxWidthWrapper>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `文章列表 | 專業心理治療及催眠應用（香港）有限公司`,
  }
}
