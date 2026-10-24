import type { ReactNode } from 'react'

// What a Book List needs of a book, flattened on the server so the client bundle never sees
// Payload documents. `price` is always set when `orderable` is true.
export type BookListItem = {
  id: string
  title: string
  isbn: string | null
  description: string | null
  price: number | null
  orderable: boolean
  cover: ReactNode
}

export type OrderableBook = BookListItem & { orderable: true; price: number }

export const isOrderable = (book: BookListItem): book is OrderableBook => book.orderable
