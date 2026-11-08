'use client'

import { useEffect } from 'react'

const HEADER_HEIGHT_VAR = '--header-h'

/**
 * Keeps `--header-h` on <html> equal to the sticky header's height. The header changes height
 * (announcement dismissed or wrapped, desktop vs mobile bar), and anything that has to clear it
 * (the article TOC's scroll margins, its sticky sidebar and reading bar) reads this variable.
 */
export function HeaderHeightVar() {
  useEffect(() => {
    const header = document.querySelector('[data-site-header]')
    if (!header) return

    const root = document.documentElement
    const write = () =>
      root.style.setProperty(
        HEADER_HEIGHT_VAR,
        `${Math.ceil(header.getBoundingClientRect().height)}px`,
      )

    write()
    const observer = new ResizeObserver(write)
    // border-box: padding and border changes count too, not just the content.
    observer.observe(header, { box: 'border-box' })

    return () => {
      observer.disconnect()
      root.style.removeProperty(HEADER_HEIGHT_VAR)
    }
  }, [])

  return null
}
