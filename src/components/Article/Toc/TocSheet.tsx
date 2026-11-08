import { X } from 'lucide-react'
import { type FC, type KeyboardEvent, useEffect, useRef } from 'react'

import type { TocHeading } from '@/utilities/article/types'

import { TOC_LABEL } from './copy'
import { TocList } from './TocList'

type TocSheetProps = {
  id: string
  headings: TocHeading[]
  activeId: string | null
  onClose: () => void
}

/**
 * The full table of contents, dropping from just under the site header over a dimmed page.
 * Mounted only while open: focus goes to the first section on mount and Tab stays inside.
 * Escape is handled by the reading bar, which also puts focus back on its toggle.
 */
export const TocSheet: FC<TocSheetProps> = ({ id, headings, activeId, onClose }) => {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sheetRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
  }, [])

  const keepFocusInside = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return

    const focusable = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    // Above the site header (z-50) so the translate widget hanging off it cannot cover the list.
    <div className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[60] xl:hidden">
      <div
        data-toc-backdrop
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/25"
      />
      <div
        ref={sheetRef}
        id={id}
        data-toc-sheet
        role="dialog"
        aria-modal="true"
        aria-label={TOC_LABEL}
        onKeyDown={keepFocusInside}
        className="relative max-h-[calc(100%-56px)] overflow-y-auto overscroll-contain border-b border-line-strong bg-paper px-4 pb-3.5 pt-1.5 font-sans shadow-float"
      >
        <div className="flex items-center justify-between text-[13px]">
          <span aria-hidden="true" className="tracking-[0.1em] text-iris">
            {TOC_LABEL}
          </span>
          <button
            type="button"
            aria-label="關閉目錄"
            onClick={onClose}
            className="-mr-3 flex size-11 items-center justify-center rounded-xs text-ink-faint transition-colors duration-200 ease-out hover:text-ink focus-visible:shadow-focus focus-visible:outline-none"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <TocList headings={headings} variant="sheet" activeId={activeId} onNavigate={onClose} />
      </div>
    </div>
  )
}
