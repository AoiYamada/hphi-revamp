/**
 * Shared geometry for the article table of contents. The numbers mirror article.css
 * (`[id^='section-']` scroll-margin-top) and TocBar's `h-9`, so change them together.
 */

/** Height of the sticky reading bar on phones and tablets. */
export const BAR_HEIGHT = 36

/** Gap between the bar (or header) and a heading the TOC has just jumped to. */
export const JUMP_GAP = 16

/**
 * A heading counts as reached once its top is within this distance below the header's bottom.
 * It sits a few px past the scroll margin (BAR_HEIGHT + JUMP_GAP), so a heading the TOC has just
 * jumped to is already the current one.
 */
export const READING_LINE_OFFSET = BAR_HEIGHT + JUMP_GAP + 4

/** Tailwind's `xl` (80rem): from here the sticky desktop TOC replaces the inline TOC and the bar. */
export const DESKTOP_QUERY = '(min-width: 80rem)'

/** Calls `onChange` whenever scrolling or resizing may have moved something. For useSyncExternalStore. */
export const subscribeToViewport = (onChange: () => void): (() => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

/** Bottom edge of the site header in viewport coordinates (0 when there is no header). */
export const getHeaderBottom = (): number => {
  const header = document.querySelector('[data-site-header]')
  return header ? Math.max(0, header.getBoundingClientRect().bottom) : 0
}
