'use client'

import type { FC } from 'react'

import type { TocHeading } from '@/utilities/article/types'

import { MIN_HEADINGS, TOC_LABEL } from './copy'
import { TocList } from './TocList'
import { useActiveHeading } from './useActiveHeading'

const DesktopTocPanel: FC<{ headings: TocHeading[] }> = ({ headings }) => {
  const activeId = useActiveHeading(headings.map(({ id }) => id))

  return (
    <nav data-toc-desktop aria-label={TOC_LABEL} className="hidden xl:block">
      {/* Sticks below the site header; scrolls on its own if the list is taller than the screen. */}
      <div className="sticky top-[calc(var(--header-h)+24px)] max-h-[calc(100dvh-var(--header-h)-48px)] overflow-y-auto font-sans">
        <p aria-hidden="true" className="mb-3 text-xs tracking-[0.2em] text-iris">
          {TOC_LABEL}
        </p>
        <TocList headings={headings} variant="desktop" activeId={activeId} />
      </div>
    </nav>
  )
}

/**
 * Sticky table of contents in the left margin of the article (xl and up). Renders nothing for
 * fewer than two headings. The grid places the body in column 2 whether or not this exists.
 */
export const DesktopToc: FC<{ headings: TocHeading[] }> = ({ headings }) =>
  headings.length < MIN_HEADINGS ? null : <DesktopTocPanel headings={headings} />
