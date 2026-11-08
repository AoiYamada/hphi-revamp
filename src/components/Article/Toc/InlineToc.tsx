'use client'

import { type FC, useId, useState } from 'react'

import type { TocHeading } from '@/utilities/article/types'

import {
  FULL_WIDTH_SPACE,
  MIN_HEADINGS,
  TOC_COLLAPSE,
  TOC_EXPAND,
  TOC_LABEL,
  sectionCount,
} from './copy'
import { TocList } from './TocList'

const InlineTocBox: FC<{ headings: TocHeading[] }> = ({ headings }) => {
  const [open, setOpen] = useState(false)
  const listId = useId()

  return (
    <div data-toc-inline className="mb-7 border-y border-line-strong font-sans xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className="flex min-h-11 w-full items-center justify-between px-0.5 text-left text-[13px] focus-visible:shadow-focus focus-visible:outline-hidden"
      >
        <span className="tracking-[0.2em] text-iris">{TOC_LABEL}</span>
        <span className="text-xs text-ink-faint">
          {open ? TOC_COLLAPSE : `${sectionCount(headings.length)}${FULL_WIDTH_SPACE}${TOC_EXPAND}`}
        </span>
      </button>
      {/* `hidden` must stay free of display utilities, or it stops hiding. */}
      <div id={listId} hidden={!open} className="px-0.5 pb-2.5">
        <TocList headings={headings} variant="inline" />
      </div>
    </div>
  )
}

/**
 * Collapsible table of contents placed after the lede on phones and tablets (below xl).
 * Renders nothing for fewer than two headings.
 */
export const InlineToc: FC<{ headings: TocHeading[] }> = ({ headings }) =>
  headings.length < MIN_HEADINGS ? null : <InlineTocBox headings={headings} />
