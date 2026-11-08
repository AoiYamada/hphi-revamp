import { useSyncExternalStore } from 'react'

import { BAR_HEIGHT, DESKTOP_QUERY, getHeaderBottom, subscribeToViewport } from './viewport'

/**
 * `desktop`: the sticky sidebar is used instead of the bar.
 * `visible`: the reader is between the inline TOC and the end of the article.
 */
export type BarMode = 'desktop' | 'hidden' | 'visible'

const readBarMode = (): BarMode => {
  if (window.matchMedia(DESKTOP_QUERY).matches) return 'desktop'

  const inlineToc = document.querySelector('[data-toc-inline]')
  const articleEnd = document.getElementById('article-end')
  if (!inlineToc || !articleEnd) return 'hidden'

  const headerBottom = getHeaderBottom()
  const pastInlineToc = inlineToc.getBoundingClientRect().bottom <= headerBottom
  const beforeEnd = articleEnd.getBoundingClientRect().top > headerBottom + BAR_HEIGHT
  return pastInlineToc && beforeEnd ? 'visible' : 'hidden'
}

/** Whole-number percentage of `.article-body` that has scrolled past the line just under the bar. */
const readProgress = (): number => {
  const body = document.querySelector('.article-body')
  if (!body) return 0

  const { top, height } = body.getBoundingClientRect()
  if (height <= 0) return 0

  const readingLine = getHeaderBottom() + BAR_HEIGHT
  const fraction = Math.min(1, Math.max(0, (readingLine - top) / height))
  return Math.round(fraction * 100)
}

export const useBarMode = (): BarMode =>
  useSyncExternalStore(subscribeToViewport, readBarMode, (): BarMode => 'hidden')

export const useReadingProgress = (): number =>
  useSyncExternalStore(subscribeToViewport, readProgress, () => 0)
