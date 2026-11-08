'use client'

import { type FC, useCallback, useEffect, useId, useRef, useState } from 'react'

import type { TocHeading } from '@/utilities/article/types'

import { MIN_HEADINGS, TOC_LABEL, numberedTitle, sectionCount } from './copy'
import { TocSheet } from './TocSheet'
import { useActiveHeading } from './useActiveHeading'
import { useBarMode, useReadingProgress } from './useTocBarState'

const ReadingBar: FC<{ headings: TocHeading[] }> = ({ headings }) => {
  const activeId = useActiveHeading(headings.map(({ id }) => id))
  const mode = useBarMode()
  const progress = useReadingProgress()
  const [open, setOpen] = useState(false)
  const sheetId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  // The sidebar takes over at xl, so an open sheet has nothing left to show.
  if (open && mode === 'desktop') setOpen(false)

  // An open sheet keeps the bar mounted even if scrolling would have hidden it.
  const shown = mode === 'visible' || (open && mode === 'hidden')

  const close = useCallback(() => setOpen(false), [])

  // Tells the rest of the page (the translate widget) whether the bar is taking up space.
  useEffect(() => {
    const root = document.documentElement
    root.dataset.tocBar = shown ? 'visible' : 'hidden'
    return () => {
      delete root.dataset.tocBar
    }
  }, [shown])

  useEffect(() => {
    if (!open) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open, close])

  // Closing hands focus back to the toggle that opened the sheet.
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus({ preventScroll: true })
    wasOpen.current = open
  }, [open])

  if (!shown) return null

  const current = headings.find(({ id }) => id === activeId)

  return (
    <>
      <div
        data-toc-reading-bar
        className="fixed inset-x-0 top-[var(--header-h)] z-40 h-9 animate-in bg-paper/95 font-sans duration-150 fade-in motion-reduce:animate-none xl:hidden"
      >
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={sheetId}
          onClick={() => setOpen((isOpen) => !isOpen)}
          className="flex h-full w-full items-center gap-2.5 px-4 pb-0.5 text-left text-[13px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-iris"
        >
          <span className="shrink-0 tracking-[0.1em] text-iris">{TOC_LABEL}</span>
          <span className="min-w-0 flex-1 truncate text-ink">
            {current ? numberedTitle(current.number, current.text) : sectionCount(headings.length)}
          </span>
          <span data-toc-chevron aria-hidden="true" className="shrink-0 text-[11px] text-ink-faint">
            ▾
          </span>
        </button>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
          <div data-toc-progress className="h-full bg-iris" style={{ width: `${progress}%` }} />
        </div>
      </div>
      {open && <TocSheet id={sheetId} headings={headings} activeId={activeId} onClose={close} />}
    </>
  )
}

/**
 * Slim reading bar pinned under the site header on phones and tablets: shows the section being
 * read and the reading progress, and opens the full table of contents. Appears once the inline
 * TOC has scrolled away and disappears at the end of the article. Renders nothing for fewer
 * than two headings.
 */
export const TocBar: FC<{ headings: TocHeading[] }> = ({ headings }) =>
  headings.length < MIN_HEADINGS ? null : <ReadingBar headings={headings} />
