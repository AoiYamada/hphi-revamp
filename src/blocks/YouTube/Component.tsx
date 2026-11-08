import React, { FC } from 'react'
import type { YouTube as YouTubeProps } from '@/payload-types'
import { cn } from '@/utilities'

type Props = YouTubeProps & {
  className?: string
}

export const YouTube: FC<Props> = ({ videoUrl, className }) => {
  const videoId = videoUrl.split('v=')[1]
  const embedUrl = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className={cn('youtube-block mx-auto my-8 w-full max-w-3xl', className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-border bg-paper-sunken">
        <iframe
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  )
}
