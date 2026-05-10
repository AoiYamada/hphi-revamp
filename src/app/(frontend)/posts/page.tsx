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
    <MaxWidthWrapper className="py-16 md:py-24">
      <header className="mb-12 max-w-3xl md:mb-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Articles
        </p>
        <h1 className="text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          文章列表
        </h1>
      </header>

      <div className="mb-8 text-sm text-muted-foreground">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

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
