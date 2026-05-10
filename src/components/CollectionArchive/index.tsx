import { cn } from '@/utilities'
import React, { FC } from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  relationTo?: 'posts' | 'courses'
  posts: (CardPostData & { relationTo?: 'posts' | 'courses' })[]
}

export const CollectionArchive: FC<Props> = (props) => {
  const { posts, relationTo } = props

  return (
    <div className={cn('w-full')}>
      <div className="grid grid-cols-4 gap-6 sm:grid-cols-8 lg:grid-cols-12 lg:gap-8">
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
  )
}
