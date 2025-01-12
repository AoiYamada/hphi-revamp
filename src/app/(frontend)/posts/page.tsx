import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
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
    <MaxWidthWrapper className="pt-24 pb-24">
      <div className="w-full mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>文章列表</h1>
        </div>
      </div>

      <div className="w-full mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="w-full">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </MaxWidthWrapper>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `文章列表 | 專業心理治療及催眠應用（香港）有限公司`,
  }
}
