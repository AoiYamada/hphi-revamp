import type { FC, MouseEvent } from 'react'

import { cn } from '@/utilities'
import type { TocHeading } from '@/utilities/article/types'

import { jumpToHeading } from './jumpToHeading'

export type TocVariant = 'desktop' | 'inline' | 'sheet'

const ITEM_STYLE: Record<TocVariant, string> = {
  desktop: 'border-t border-line py-[7px] leading-[1.55]',
  inline: 'border-t border-dashed border-line py-2.5 leading-normal',
  sheet: 'border-t border-line py-2.5 leading-normal',
}

/** A click the browser should handle itself: new tab, new window, download, middle button. */
const isModified = (event: MouseEvent) =>
  event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

type TocListProps = {
  headings: TocHeading[]
  variant: TocVariant
  /** Id of the heading being read; that item is bold with an iris number. */
  activeId?: string | null
  /** Runs just before the jump (the sheet uses it to close itself). */
  onNavigate?: () => void
}

/**
 * The numbered list of sections shared by the three TOC surfaces. Items are real
 * `<a href="#section-N">` links, so they still work without JavaScript.
 */
export const TocList: FC<TocListProps> = ({ headings, variant, activeId = null, onNavigate }) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.defaultPrevented || isModified(event)) return
    event.preventDefault()
    onNavigate?.()
    jumpToHeading(id)
  }

  return (
    <ol role="list">
      {headings.map(({ id, number, text }) => {
        const isActive = id === activeId
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={(event) => handleClick(event, id)}
              className={cn(
                'grid grid-cols-[22px_1fr] rounded-xs text-sm text-ink-soft transition-colors duration-200 ease-out hover:text-ink focus-visible:shadow-focus focus-visible:outline-hidden',
                ITEM_STYLE[variant],
                isActive && 'font-semibold text-ink',
              )}
            >
              <span className={cn('pt-0.5 text-xs text-ink-faint', isActive && 'text-iris')}>
                {number}
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">{text}</span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
