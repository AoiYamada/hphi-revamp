import { cn } from '@/utilities'
import React, { FC } from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneSixth: '2',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="w-full my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`lg:col-span-${colsSpanClasses[size ?? 'full']}`, {
                  'col-span-2': size === 'oneSixth',
                  'col-span-4': size !== 'oneSixth',
                  'md:col-span-2': size !== 'full' && size !== 'oneSixth',
                  'md:col-span-1': size === 'oneSixth',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
