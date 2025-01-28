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
    <MaxWidthWrapper className="py-2 relative flex items-start">
      <RichText data={content!} className="flex-grow max-w-full" />
      <button
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 ml-2 pt-2"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </MaxWidthWrapper>
  )
}

export default Announcement
