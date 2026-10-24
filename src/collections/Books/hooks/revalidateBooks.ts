import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Book } from '@/payload-types'

import { BOOKS_CACHE_TAG } from '../cacheTag'

export const revalidateBooks: CollectionAfterChangeHook<Book> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating book lists (book ${doc.id} changed)`)

    revalidateTag(BOOKS_CACHE_TAG, 'max')
  }

  return doc
}

export const revalidateBooksOnDelete: CollectionAfterDeleteHook<Book> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating book lists (book ${doc?.id} deleted)`)

    revalidateTag(BOOKS_CACHE_TAG, 'max')
  }

  return doc
}
