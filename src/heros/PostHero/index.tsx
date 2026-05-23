import { formatDateTime } from '@/utilities/formatDateTime'
import { Fragment, type FC } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

type PostHeroProps = {
  post: Post
}

export const PostHero: FC<PostHeroProps> = ({
  post: { categories, meta: { image: metaImage } = {}, populatedAuthors, publishedAt, title },
}) => {
  return (
    <section className="relative isolate flex min-h-[44vh] items-end overflow-hidden md:min-h-[52vh]">
      {metaImage && typeof metaImage !== 'string' && (
        <Media
          fill
          priority
          loading="eager"
          imgClassName="absolute inset-0 -z-20 object-cover"
          resource={metaImage}
        />
      )}

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black to-transparent" />

      <MaxWidthWrapper className="relative z-10 w-full pb-12 pt-24 md:pb-16 md:pt-32">
        <div className="max-w-3xl text-primary-foreground">
          {categories && categories.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  return (
                    <span
                      key={index}
                      className="rounded-full border border-primary-foreground/40 bg-primary-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-sm"
                    >
                      {categoryTitle || 'Untitled category'}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}

          <h1 className="mb-8 text-3xl font-light leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div className="flex flex-col gap-4 text-sm md:flex-row md:gap-12">
            {populatedAuthors && populatedAuthors.length > 0 && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-primary-foreground/70">
                  作者
                </p>
                <p>
                  {populatedAuthors.map((author, index) => {
                    const { name } = author
                    const isLast = index === populatedAuthors.length - 1
                    const secondToLast = index === populatedAuthors.length - 2

                    return (
                      <Fragment key={index}>
                        {name}
                        {secondToLast && populatedAuthors.length > 2 && <>, </>}
                        {secondToLast && populatedAuthors.length === 2 && <> </>}
                        {!isLast && populatedAuthors.length > 1 && <>and </>}
                      </Fragment>
                    )
                  })}
                </p>
              </div>
            )}

            {publishedAt && (
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-primary-foreground/70">
                  出版日期
                </p>
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
