'use client'

import { cn } from '@/utilities'
import React, { FC, useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getClientSideURL } from '@/utilities/getURL'

export const VideoMedia: FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { url } = resource

    return (
      <video className={cn(videoClassName)} controls onClick={onClick} playsInline ref={videoRef}>
        {/* don't use filename and directly construct a mounted public link like /media/:filename, this path won't work until next process restart */}
        <source src={`${getClientSideURL()}${url}`} />
      </video>
    )
  }

  return null
}
