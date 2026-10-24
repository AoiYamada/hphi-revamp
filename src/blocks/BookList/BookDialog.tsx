import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import React, { FC } from 'react'

import { BookPrice } from './BookItem'
import { CoverFrame } from './CoverFrame'
import type { BookListItem } from './types'

type Props = {
  book: BookListItem | null
  open: boolean
  selected: boolean
  onOpenChange: (open: boolean) => void
  onToggle: (id: string) => void
  // There is no DialogTrigger, so Radix can't return focus on close by itself.
  onCloseAutoFocus: (event: Event) => void
}

export const BookDialog: FC<Props> = ({
  book,
  open,
  selected,
  onOpenChange,
  onToggle,
  onCloseAutoFocus,
}) => (
  <Dialog open={open && book !== null} onOpenChange={onOpenChange}>
    {book && (
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <div className="grid gap-6 sm:grid-cols-[13rem_minmax(0,1fr)]">
          <CoverFrame cover={book.cover} className="mx-auto w-40 rounded-md sm:w-full" />

          <div className="flex min-w-0 flex-col gap-4">
            <DialogHeader className="pr-8">
              <DialogTitle className="text-xl">{book.title}</DialogTitle>
              {/* A div, since the 暫停發售 badge is one and can't sit inside the default <p>. */}
              <DialogDescription asChild>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {book.isbn && <span>ISBN {book.isbn}</span>}
                  <span className="text-base font-medium text-foreground">
                    <BookPrice book={book} />
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>

            {book.description && (
              <p className="max-w-[65ch] whitespace-pre-line leading-[1.6] text-foreground">
                {book.description}
              </p>
            )}

            {book.orderable && (
              <Button
                variant={selected ? 'outline' : 'default'}
                className="mt-auto self-start"
                onClick={() => onToggle(book.id)}
              >
                {selected ? '取消揀選' : '揀選此書'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    )}
  </Dialog>
)
