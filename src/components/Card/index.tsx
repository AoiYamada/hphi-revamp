'use client'

import { cn } from '@/utilities'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { FC, Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'courses'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-lift-1 transition-shadow duration-300 ease-out hover:shadow-lift-2',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {!metaImage && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="33vw"
            imgClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {showCategories && hasCategories && (
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'
                const isLast = index === categories.length - 1
                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )}

        {titleToUse && (
          <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors duration-200 ease-out group-hover:text-secondary">
            <Link className="not-prose" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}

        {description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
