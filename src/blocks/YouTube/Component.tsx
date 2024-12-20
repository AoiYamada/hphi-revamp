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
    <div className={cn('youtube-block mx-auto my-8 w-full', className)}>
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-[168px] w-[300px] max-w-full sm:h-[315px] sm:w-[560px] lg:h-[405px] lg:w-[720px]"
      ></iframe>
    </div>
  )
}
