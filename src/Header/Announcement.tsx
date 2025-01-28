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
    <div className="bg-primary text-primary-foreground">
      <MaxWidthWrapper className="py-2">
        <div className="w-full flex gap-2 items-start">
          <RichText data={content!} className="flex-grow max-w-full justify-between" />
          <div className="flex-shrink-0 p-1">
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 border border-primary-foreground rounded-full"
              aria-label="Close announcement"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Announcement
