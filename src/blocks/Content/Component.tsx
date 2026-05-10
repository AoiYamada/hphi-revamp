import { cn } from '@/utilities'
import React, { FC } from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

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
            const {
              enableLink,
              link,
              linkPosition,
              richText,
              size,
              enableBackground,
              backgroundImage,
            } = col

            const linkJustifyClass = {
              left: 'justify-start',
              middle: 'justify-center',
              right: 'justify-end',
            }[linkPosition ?? 'left']

            const hasBackground =
              enableBackground && backgroundImage && typeof backgroundImage === 'object'

            return (
              <div
                className={cn(colsSpanClasses[size ?? 'full'], {
                  'relative isolate flex flex-col gap-4 overflow-hidden rounded-lg p-6 md:p-8':
                    hasBackground,
                })}
                key={index}
              >
                {hasBackground && (
                  <Media
                    fill
                    imgClassName="-z-10 object-cover"
                    priority={false}
                    loading="lazy"
                    resource={backgroundImage}
                  />
                )}

                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && (
                  <div className={cn('flex', linkJustifyClass)}>
                    <CMSLink {...link} />
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
