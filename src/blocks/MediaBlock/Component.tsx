import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities'
import React, { FC } from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  videoClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    videoClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          'w-full': enableGutter,
        },
        className,
      )}
    >
      <Media
        imgClassName={cn('rounded-[0.8rem] mx-auto', imgClassName)}
        videoClassName={cn('rounded-[0.8rem] mx-auto', videoClassName)}
        resource={media}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              'w-full': !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
