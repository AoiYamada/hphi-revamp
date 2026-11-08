import { useSyncExternalStore } from 'react'

import { READING_LINE_OFFSET, getHeaderBottom, subscribeToViewport } from './viewport'

/** The last heading whose top has scrolled past the reading line, or null before the first one. */
const findActiveHeading = (ids: ReadonlyArray<string>): string | null => {
  const readingLine = getHeaderBottom() + READING_LINE_OFFSET
  const reached = ids.filter((id) => {
    const heading = document.getElementById(id)
    return heading !== null && heading.getBoundingClientRect().top <= readingLine
  })
  return reached.at(-1) ?? null
}

/**
 * Id of the section being read: the last heading (in the order given) whose top has scrolled
 * past the bottom of the sticky header plus a reading margin. Null on the server and before the
 * first heading has been reached.
 */
export function useActiveHeading(ids: ReadonlyArray<string>): string | null {
  return useSyncExternalStore(
    subscribeToViewport,
    () => findActiveHeading(ids),
    () => null,
  )
}
