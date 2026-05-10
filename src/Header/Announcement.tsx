'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RichText from '@/components/RichText'
import { Header } from '@/payload-types'
import React, { FC, useState } from 'react'
import { X } from 'lucide-react'

type AnnouncementProps = NonNullable<Header['announcement']>

const Announcement: FC<AnnouncementProps> = ({ enable, content }) => {
  const [isVisible, setIsVisible] = useState(enable)

  if (!isVisible) return null

  return (
    <div className="z-50 bg-primary text-primary-foreground">
      <MaxWidthWrapper className="py-2">
        <div className="flex w-full items-center gap-3">
          <RichText
            data={content!}
            className="flex-grow max-w-full text-sm [&_p]:m-0 [&_p]:leading-snug"
          />
          <button
            onClick={() => setIsVisible(false)}
            className="shrink-0 rounded-full p-1.5 transition-colors duration-200 ease-out hover:bg-secondary/40 focus-visible:outline-none focus-visible:shadow-lift-focus"
            aria-label="Close announcement"
          >
            <X size={14} />
          </button>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Announcement
