'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RichText from '@/components/RichText'
import { Header } from '@/payload-types'
import React, { FC } from 'react'
import { X } from 'lucide-react'
import { dismissibleProps } from './Dismissal/dismissal'
import { useDismissal } from './Dismissal/useDismissal'

type AnnouncementProps = NonNullable<Header['announcement']> & {
  dismissalHash: string
}

const Announcement: FC<AnnouncementProps> = ({ enable, content, dismissalHash }) => {
  const { isDismissed, dismiss } = useDismissal('announcement', dismissalHash)

  if (!enable || !content || isDismissed) return null

  return (
    <div {...dismissibleProps('announcement')} className="z-50 bg-primary text-primary-foreground">
      <MaxWidthWrapper className="py-2">
        <div className="flex w-full items-center gap-3">
          <RichText
            data={content}
            enableProse={false}
            className="flex-grow max-w-full text-sm [&_p]:m-0 [&_p]:leading-snug"
          />
          <button
            onClick={dismiss}
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
