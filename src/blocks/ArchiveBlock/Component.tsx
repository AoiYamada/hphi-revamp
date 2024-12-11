import type { Post, ArchiveBlock as ArchiveBlockProps, Course } from '@/payload-types'

import config from '@payload-config'
import { getPayload } from 'payload'
import React, { FC } from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async ({
  id,
  categories,
  introContent,
  relationTo,
  limit: limitFromProps,
  populateBy,
  selectedDocs,
}) => {
  const limit = limitFromProps || 3

  let posts: ((Post | Course) & { relationTo?: 'posts' | 'courses' })[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: relationTo ?? 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') {
          return {
            ...post.value,
            relationTo: post.relationTo,
          }
        }
      }) as (Post | Course)[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="w-full mb-16">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive relationTo={relationTo ?? 'posts'} posts={posts} />
    </div>
  )
}
