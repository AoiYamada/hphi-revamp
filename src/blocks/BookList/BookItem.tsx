import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/utilities'
import React, { FC } from 'react'

import { CoverFrame } from './CoverFrame'
import { formatPrice } from './orderRequest'
import type { BookListItem } from './types'

type Props = {
  book: BookListItem
  // Unique per Book List, so the same book in two lists on one page gets distinct ids.
  idPrefix: string
  selected: boolean
  onOpen: (id: string, opener: HTMLElement) => void
  onToggle: (id: string) => void
}

export const BookPrice: FC<{ book: BookListItem }> = ({ book }) =>
  book.orderable && book.price !== null ? (
    <span className="shrink-0 tabular-nums">{formatPrice(book.price)}</span>
  ) : (
    <Badge variant="outline" className="shrink-0">
      暫停發售
    </Badge>
  )

// A compact row on mobile and a cover card from md up. Opening the book and selecting it are
// separate targets: the title button stretches over the cover and text, never the checkbox.
export const BookItem: FC<Props> = ({ book, idPrefix, selected, onOpen, onToggle }) => {
  const checkboxId = `${idPrefix}-book-${book.id}`

  return (
    <li
      className={cn(
        'flex items-center gap-1 py-2 pl-1 pr-4',
        'md:flex-col md:items-stretch md:gap-0 md:overflow-hidden md:rounded-lg md:border md:border-border md:bg-card md:p-0 md:shadow-lift-1',
        'md:transition-shadow md:duration-300 md:ease-out md:hover:shadow-lift-2',
        selected && 'md:border-primary',
        // The card clips its children, so from md up the focus ring goes on the card itself.
        'md:has-[[data-book-opener]:focus-visible]:border-secondary md:has-[[data-book-opener]:focus-visible]:shadow-lift-focus',
      )}
    >
      <div className="group relative flex min-w-0 flex-1 items-center gap-3 md:flex-col md:items-stretch md:gap-0">
        <CoverFrame
          cover={book.cover}
          className="w-12 rounded-sm md:w-full md:rounded-none"
          inert
        />
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 text-sm text-muted-foreground md:flex-col md:items-start md:justify-start md:gap-1.5 md:p-4 md:text-base md:text-foreground">
          <h3 className="min-w-0 text-base font-semibold leading-snug text-foreground md:text-lg">
            <button
              type="button"
              data-book-opener
              onClick={(event) => onOpen(book.id, event.currentTarget)}
              className={cn(
                'text-left transition-colors duration-200 ease-out-quart group-hover:text-secondary',
                'after:absolute after:inset-0 after:rounded-md md:after:rounded-none',
                'focus-visible:outline-none focus-visible:after:shadow-lift-focus md:focus-visible:after:shadow-none',
              )}
            >
              {book.title}
            </button>
          </h3>
          <BookPrice book={book} />
        </div>
      </div>

      {book.orderable ? (
        <label
          htmlFor={checkboxId}
          className={cn(
            'order-first flex size-11 shrink-0 cursor-pointer items-center justify-center',
            'md:order-last md:size-auto md:justify-start md:gap-2 md:border-t md:border-border md:px-4 md:py-3 md:text-sm md:font-medium md:text-foreground',
          )}
        >
          <Checkbox id={checkboxId} checked={selected} onCheckedChange={() => onToggle(book.id)} />
          <span className="sr-only md:not-sr-only">揀選</span>
          <span className="sr-only">《{book.title}》</span>
        </label>
      ) : (
        <span aria-hidden className="order-first size-11 shrink-0 md:hidden" />
      )}
    </li>
  )
}
