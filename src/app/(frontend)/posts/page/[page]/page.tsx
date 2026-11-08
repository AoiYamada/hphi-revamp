import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageHeader } from '@/components/PageHeader'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export const revalidate = 600

type Args = {
  params: Promise<{
    page: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { page } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(page)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { page } = await paramsPromise
  return {
    title: `所有文章 第 ${page || ''} 頁 | 專業心理治療及催眠應用（香港）有限公司`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { page: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ page: String(i) })
  }

  return pages
}
