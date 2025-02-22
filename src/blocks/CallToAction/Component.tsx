import React, { FC } from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="w-full">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 py-3 px-6 ">
        <div className="flex items-center">
          {richText && (
            <div className="mx-auto prose md:prose-md dark:prose-invert w-full max-w-full">
              <RichText className="mb-0" data={richText} enableGutter={false} />
            </div>
          )}
        </div>
        <div className="flex flex-row gap-4 mb-4">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
