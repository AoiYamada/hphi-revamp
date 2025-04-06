'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities'
import NextImage from 'next/image'
import React, { FC } from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getClientSideURL } from '@/utilities/getURL'

const { breakpoints } = cssVariables

// A base64 encoded image to use as a placeholder while the image is loading
const placeholderBlur =
  'data:image/jpeg;base64,UklGRn4DAABXRUJQVlA4WAoAAAAgAAAAjwEA0QAAVlA4IGADAADQJgCdASqQAdIAPxGGuVawuCwjovKbKwAiCWlu4D8frPirKrU6Fa/GkzS86fYBuS86tRWngDJL0YyFVI5rW5B4kQEjqO/DYTaBbKh8Qihyg2ZudsMyMa1hgvy5LEbGapqIKHYuqTAa3zmpgjN0uCCq8bQTYzN0P6ftKfOlwMC0BQBibVxqu9CBNrgj+Eg9i3saUmFe+DaI8qEbx8AlxUtvtdaPftDpc6ywpyXSybbI481KE3VMj/NJ9DRBrct1dsIxqB/70Trbh2V141MuVK8hAxpCJiWKQs2laKqwJxmUq6K3YmdmEy6QHBzlDOPcgQUKo5pqmYY8r7Y3zBAy91XDTS0WhuJsPBfJ5OtuJZr9j1YXtWIPUFcd8JiQZnZBVZ5ZReb2Fbnhbu+c55D+V3Oql346ODPcEOakfpazyTYAAP7n//OzrquXty6jrl1xPwaZJMgoYkdVKYxiIyRdzYu3b8t2rDrizArXYOgTEei7g9bIsainAF60dWA+fGIW7ezuzs/ipiM/Q1uDJGbzre5tYnYEpX5yC2spzZw8GkMHly2l9rQdfSYyuC+k7zt9DBkrOARnxQJQMy+45waPfvY5lJNMo8a3yBln570jFEdfNOqq5zm49OePjXs6M+RMAJVGrJybhlqb2cFkKVASiRujDDjS091dP4MttW4M2t+He+yodj3BVjyoUWcFwMB5QLX/iQqoMkCXrz0I/EhhPP6fTDIS7URZoGsVWXL5ms+Ffqm2K6bJkOU/x6+mVBY+SCSszRHGLu/xx7qPFOO1v1Wwk+RazQOKzCOrxsGn5J31JiJByQdPzVhTC+1yV3Atw2FJ+6Rk5w/g0iqBobGW8haDbYjX9Us46jBWepyLFLT7bNrjKvfJn1g/3NSeW0AIxPqUpS4ttTXuDOsWksqFVmEppfGVh8IIkRr+gzozhHnn7QenT7bdebCiocowuwco0jcEVtfncvoLDj9ZvNfv6POW3dvwR/LJoxG8L73ULQQP6a6/417d60inXaXdT7NguFBOEs56pJHWcC43Mx7+B7XU1Vx7HyPm/aBNuK8auJs/4godF6pdHi5Mv72vQ+N6qKj6HZQKwkpLAuyn/LydWBihm2guJvLKzFuje8/Tpjv5MLjjIddPTGPhql+Xer2zCAA='

export const ImageMedia: FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      filename: fullFilename,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    src = `${getClientSideURL()}${url}`
  }

  const loading = loadingFromProps || 'lazy'

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  return (
    src && (
      <picture className="mt-0">
        <NextImage
          alt={alt || ''}
          className={cn(imgClassName)}
          fill={fill}
          height={!fill ? height : undefined}
          placeholder="blur"
          blurDataURL={placeholderBlur}
          priority={priority}
          quality={100}
          loading={loading}
          sizes={sizes}
          src={src}
          width={!fill ? width : undefined}
        />
      </picture>
    )
  )
}
