import { formatDateTime } from 'src/utilities/formatDateTime'
import { Fragment, type FC } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export const PostHero: FC<{
  post: Post
}> = ({
  post: { categories, meta: { image: metaImage } = {}, populatedAuthors, publishedAt, title },
}) => {
  return (
    <div className="relative flex items-end">
      <div className="w-full z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white py-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {titleToUse}
                    {!isLast && <>, &nbsp;</>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            <div className="flex flex-col gap-4">
              {populatedAuthors && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>
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
                </div>
              )}
            </div>
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="select-none">
        {metaImage && typeof metaImage !== 'string' && (
          <Media fill imgClassName="-z-10 object-cover" resource={metaImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
