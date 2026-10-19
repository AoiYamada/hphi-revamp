import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload'

import { revalidateTag } from 'next/cache'

// The Header global embeds Social Strip QR codes, but its cache is only revalidated when the
// header itself is saved. Replacing or deleting one of those files would leave every page
// pointing at a missing image, so revalidate the header when a media doc it uses changes.
// Unrelated uploads are skipped: the header is on every page, so revalidating it is costly.
const revalidateIfUsedInHeader = async (mediaId: string, req: PayloadRequest) => {
  const { payload, context } = req
  if (context.disableRevalidate) return

  try {
    const header = await payload.findGlobal({ slug: 'header', depth: 0, req })
    const isUsed = header.socialStrip?.channels?.some(
      ({ qrCode }) => (typeof qrCode === 'object' ? qrCode?.id : qrCode) === mediaId,
    )

    if (isUsed) {
      payload.logger.info(`Revalidating header (social strip media ${mediaId} changed)`)
      revalidateTag('global_header', 'max')
    }
  } catch (error) {
    // Don't fail the media operation over a cache refresh; re-saving the header also fixes it.
    payload.logger.error({ err: error, mediaId }, 'Failed to revalidate header after media change')
  }
}

export const revalidateHeaderOnMediaChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'update') await revalidateIfUsedInHeader(doc.id, req)

  return doc
}

export const revalidateHeaderOnMediaDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await revalidateIfUsedInHeader(doc.id, req)

  return doc
}
