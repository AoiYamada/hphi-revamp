'use client'

import { sendGAEvent } from '@next/third-parties/google'
import React, { FC, useId, useRef, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { BookDialog } from './BookDialog'
import { BookItem } from './BookItem'
import { OrderBar } from './OrderBar'
import {
  buildBeginCheckoutEvent,
  buildOrderRequestMessage,
  buildWhatsAppUrl,
  formatPrice,
  totalPrice,
} from './orderRequest'
import { type BookListItem, isOrderable } from './types'

type Props = {
  heading: string
  books: BookListItem[]
  whatsAppNumber: string
  orderingTerms: string
}

// Each Book List keeps its own selection; nothing carries over to other lists or pages.
export const BookListClient: FC<Props> = ({ heading, books, whatsAppNumber, orderingTerms }) => {
  const listId = useId()
  const headingId = `${listId}-heading`
  const signedCopyId = `${listId}-signed-copy`
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [signedCopy, setSignedCopy] = useState(true)
  // Kept after closing so the dialog still has content while it animates out.
  const [activeBookId, setActiveBookId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const openerRef = useRef<HTMLElement | null>(null)

  const orderableBooks = books.filter(isOrderable)
  const selectedBooks = orderableBooks.filter((book) => selectedIds.includes(book.id))
  const activeBook = books.find((book) => book.id === activeBookId) ?? null
  const total = totalPrice(selectedBooks)

  const toggleBook = (id: string) =>
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((other) => other !== id) : [...ids, id]))

  const openBook = (id: string, opener: HTMLElement) => {
    openerRef.current = opener
    setActiveBookId(id)
    setDialogOpen(true)
  }

  const returnFocusToOpener = (event: Event) => {
    event.preventDefault()
    openerRef.current?.focus()
  }

  const orderUrl = buildWhatsAppUrl(
    whatsAppNumber,
    buildOrderRequestMessage(selectedBooks, signedCopy),
  )

  const trackOrderRequest = () =>
    sendGAEvent('event', 'begin_checkout', buildBeginCheckoutEvent(selectedBooks))

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-6">
      <h2
        id={headingId}
        className="text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.01em] text-foreground"
      >
        {heading}
      </h2>

      <ul className="divide-y divide-border rounded-lg border border-border bg-card md:grid md:grid-cols-3 md:gap-6 md:divide-y-0 md:rounded-none md:border-0 md:bg-transparent lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            idPrefix={listId}
            selected={selectedIds.includes(book.id)}
            onOpen={openBook}
            onToggle={toggleBook}
          />
        ))}
      </ul>

      {orderableBooks.length > 0 && (
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
          <label
            htmlFor={signedCopyId}
            className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-foreground"
          >
            <Checkbox
              id={signedCopyId}
              checked={signedCopy}
              onCheckedChange={(checked) => setSignedCopy(checked === true)}
            />
            需要作者親筆簽名
          </label>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground md:items-end md:py-3 md:text-right">
            <p className="whitespace-pre-line">{orderingTerms}</p>
            {selectedBooks.length === 0 && <p>剔選想要的書籍，即可經 WhatsApp 訂購。</p>}
          </div>
        </div>
      )}

      {/* Always filled, so clearing the last book is announced too (initial text is not). */}
      <p aria-live="polite" className="sr-only">
        {`已選 ${selectedBooks.length} 本，合共 ${formatPrice(total)}`}
      </p>

      {selectedBooks.length > 0 && (
        <OrderBar
          count={selectedBooks.length}
          total={total}
          href={orderUrl}
          onOrder={trackOrderRequest}
        />
      )}

      <BookDialog
        book={activeBook}
        open={dialogOpen}
        selected={activeBook !== null && selectedIds.includes(activeBook.id)}
        onOpenChange={setDialogOpen}
        onToggle={toggleBook}
        onCloseAutoFocus={returnFocusToOpener}
      />
    </section>
  )
}
