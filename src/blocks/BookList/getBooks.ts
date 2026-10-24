import type { Book, BookListBlock } from '@/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { BOOKS_CACHE_TAG } from '@/collections/Books/cacheTag'

const findAllBooks = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'books',
    depth: 1,
    pagination: false,
    sort: ['priority', 'title'],
  })

  return docs
}

// Keeps the editor's order and silently drops books that have since been deleted.
const findBooksByIds = async (ids: string[]) => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'books',
    depth: 1,
    pagination: false,
    where: { id: { in: ids } },
  })

  const booksById = new Map(docs.map((book) => [book.id, book]))
  return ids.flatMap((id) => booksById.get(id) ?? [])
}

// Selected books are re-read by id rather than taken from the page's populated relationship,
// so that both modes go through a cache entry tagged BOOKS_CACHE_TAG and refresh when a book
// changes.
export const getBookListBooks = async ({
  populateBy,
  selectedBooks,
}: Pick<BookListBlock, 'populateBy' | 'selectedBooks'>): Promise<Book[]> => {
  if (populateBy === 'selection') {
    const ids = (selectedBooks ?? []).map((book) => (typeof book === 'object' ? book.id : book))
    if (ids.length === 0) return []

    return unstable_cache(() => findBooksByIds(ids), ['book-list', 'selection', ...ids], {
      tags: [BOOKS_CACHE_TAG],
    })()
  }

  return unstable_cache(findAllBooks, ['book-list', 'all'], { tags: [BOOKS_CACHE_TAG] })()
}
