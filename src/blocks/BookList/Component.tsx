import type { Book, BookOrdering, BookListBlock as BookListBlockProps } from '@/payload-types'

import React, { FC } from 'react'

import { DEFAULT_ORDERING_TERMS, DEFAULT_WHATSAPP_NUMBER } from '@/BookOrdering/defaults'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { BookListClient } from './Component.client'
import { getBookListBooks } from './getBooks'
import type { BookListItem } from './types'

const COVER_SIZES = '(min-width: 768px) 240px, 160px'

const renderCover = ({ cover }: Book) => {
  // A deleted media doc leaves an unpopulated id behind; the frame shows a placeholder instead.
  if (!cover?.media || typeof cover.media !== 'object') return null

  return (
    <MediaBlock
      {...cover}
      blockType="mediaBlock"
      captionClassName="hidden"
      fill
      imgClassName="rounded-none object-cover"
      size={COVER_SIZES}
      videoClassName="absolute inset-0 size-full rounded-none object-cover"
    />
  )
}

const toBookListItem = (book: Book): BookListItem => ({
  id: book.id,
  title: book.title,
  isbn: book.isbn?.trim() || null,
  description: book.description?.trim() || null,
  price: book.price ?? null,
  orderable: (book.orderable ?? true) && typeof book.price === 'number',
  cover: renderCover(book),
})

export const BookListBlock: FC<
  BookListBlockProps & {
    id?: string
  }
> = async ({ heading, populateBy, selectedBooks }) => {
  const [books, ordering] = await Promise.all([
    getBookListBooks({ populateBy, selectedBooks }),
    getCachedGlobal('bookOrdering', 0) as Promise<BookOrdering>,
  ])

  if (books.length === 0) return null

  return (
    <BookListClient
      books={books.map(toBookListItem)}
      heading={heading}
      orderingTerms={ordering?.orderingTerms || DEFAULT_ORDERING_TERMS}
      whatsAppNumber={ordering?.whatsAppNumber || DEFAULT_WHATSAPP_NUMBER}
    />
  )
}
