import { cn } from 'src/utilities/cn'
import React, { FC } from 'react'

import type { Post } from '@/payload-types'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  relationTo?: 'posts' | 'courses'
  posts: (CardPostData & { relationTo?: 'posts' | 'courses' })[]
}

export const CollectionArchive: FC<Props> = (props) => {
  const { posts, relationTo } = props

  return (
    <div className={cn('w-full')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card
                    className="h-full"
                    doc={result}
                    relationTo={result.relationTo ?? relationTo ?? 'posts'}
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
