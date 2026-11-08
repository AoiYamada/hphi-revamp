/**
 * Scrolls to a heading and records it in the URL. The heading's `scroll-margin-top` (article.css)
 * keeps it clear of the sticky header and the reading bar. Smooth unless the visitor asked for
 * reduced motion.
 */
export function jumpToHeading(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}
