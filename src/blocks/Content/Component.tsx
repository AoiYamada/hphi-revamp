import { cn } from '@/utilities'
import React, { FC } from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: 'col-span-4 lg:col-span-12',
    half: 'col-span-4 md:col-span-2 lg:col-span-6',
    oneSixth: 'col-span-2 md:col-span-1 lg:col-span-2',
    oneThird: 'col-span-4 md:col-span-2 lg:col-span-4',
    twoThirds: 'col-span-4 md:col-span-2 lg:col-span-8',
  }

  return (
    <div className="w-full my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div className={colsSpanClasses[size ?? 'full']} key={index}>
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
