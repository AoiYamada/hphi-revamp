import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload'

import { revalidateTag } from 'next/cache'

import { BOOKS_CACHE_TAG } from '../cacheTag'

// Book Lists embed cover media, but their cache is only revalidated when a book is saved.
// Replacing or deleting a cover file would leave every Book List pointing at a missing image,
// so revalidate them when a media doc used as a cover changes. Unrelated uploads are skipped.
const revalidateIfUsedAsCover = async (mediaId: string, req: PayloadRequest) => {
  const { payload, context } = req
  if (context.disableRevalidate) return

  try {
    const { totalDocs } = await payload.count({
      collection: 'books',
      where: {
        or: [{ 'cover.media': { equals: mediaId } }, { 'cover.thumbnail': { equals: mediaId } }],
      },
      req,
    })

    if (totalDocs > 0) {
      payload.logger.info(`Revalidating book lists (cover media ${mediaId} changed)`)
      revalidateTag(BOOKS_CACHE_TAG, 'max')
    }
  } catch (error) {
    // Don't fail the media operation over a cache refresh; re-saving the book also fixes it.
    payload.logger.error(
      { err: error, mediaId },
      'Failed to revalidate book lists after media change',
    )
  }
}

export const revalidateBooksOnMediaChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'update') await revalidateIfUsedAsCover(doc.id, req)

  return doc
}

export const revalidateBooksOnMediaDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await revalidateIfUsedAsCover(doc.id, req)

  return doc
}
