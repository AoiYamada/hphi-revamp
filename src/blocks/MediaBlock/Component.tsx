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
  fill?: boolean
  imgClassName?: string
  size?: string
  videoClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    fill,
    imgClassName,
    size,
    videoClassName,
    media,
    thumbnail,
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
        fill={fill}
        size={size}
        imgClassName={cn('rounded-sm mx-auto', imgClassName)}
        videoClassName={cn('rounded-sm mx-auto', videoClassName)}
        resource={media}
        thumbnail={thumbnail ? thumbnail : undefined}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            'mt-3 text-center font-sans text-[13px] leading-relaxed text-ink-faint',
            {
              'w-full': !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          {/* 圖說：黑體 13px、muted、置中；編輯設定的對齊（inline text-align）仍然優先。 */}
          <RichText data={caption} enableGutter={false} enableProse={false} />
        </div>
      )}
    </div>
  )
}
