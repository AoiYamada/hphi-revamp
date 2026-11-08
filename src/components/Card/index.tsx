'use client'

import { cn } from '@/utilities'
import { CATEGORY_SEPARATOR, categoryTitles } from '@/utilities/categoryTitles'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { FC } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

/** The underlined text at the bottom of the card, by what the card links to. */
const LINK_LABELS: Record<string, string> = {
  courses: '了解課程',
  posts: '閱讀全文',
}
const DEFAULT_LINK_LABEL = '了解更多'

/** next/image hint: one column on phones, two on tablets, three from lg (the archive grids). */
const IMAGE_SIZES = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'

/**
 * Card for courses, posts, search results and related posts (design 6.3): paper-raised, 1px line border,
 * 4px corners, no shadow. 4:3 image, optional category kicker, serif title, three lines of summary and an
 * underlined text link. The whole card is clickable (useClickableCard); hover darkens the border and
 * underlines the title, nothing lifts or zooms. Keyboard focus on the title link rings the card.
 */
export const Card: FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'courses'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const {
    card: { ref: cardRef },
    link: { ref: linkRef },
  } = useClickableCard<HTMLElement>({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const kicker = showCategories ? categoryTitles(categories).join(CATEGORY_SEPARATOR) : ''
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`
  const linkLabel = (relationTo && LINK_LABELS[relationTo]) || DEFAULT_LINK_LABEL

  return (
    <article
      className={cn(
        'group flex cursor-pointer flex-col overflow-hidden rounded-sm border border-line bg-paper-raised text-ink transition-colors duration-200 ease-out-quart hover:border-line-strong has-[a:focus-visible]:border-iris has-[a:focus-visible]:shadow-focus',
        className,
      )}
      ref={cardRef}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-sunken">
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            fill
            resource={metaImage}
            size={IMAGE_SIZES}
            className="absolute inset-0"
            imgClassName="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5.5">
        {kicker && <p className="mb-2 font-sans text-xs tracking-[0.12em] text-iris">{kicker}</p>}

        {titleToUse && (
          <h3 className="font-serif text-[19px] font-bold leading-normal text-ink group-hover:underline">
            <Link className="not-prose focus-visible:outline-hidden" href={href} ref={linkRef}>
              {titleToUse}
            </Link>
          </h3>
        )}

        {description && (
          <p className="mt-2.5 line-clamp-3 font-sans text-sm leading-[1.8] text-ink-soft">
            {sanitizedDescription}
          </p>
        )}

        <div className="mt-auto pt-4">
          <span className="inline-block border-b border-ink pb-0.5 font-sans text-[13.5px] text-ink">
            {linkLabel}
          </span>
        </div>
      </div>
    </article>
  )
}
