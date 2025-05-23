import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) {
    return doc
  }

  if (doc._status === 'published') {
    const path = `/${doc.slug}`

    payload.logger.info(`Revalidating page at path: ${path}`)

    revalidatePath(encodeURI(path))

    if (doc.slug === 'home') {
      revalidatePath('')
      revalidatePath('/')
    }

    revalidateTag('pages-sitemap')
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/${previousDoc.slug}`

    payload.logger.info(`Revalidating old page at path: ${oldPath}`)

    revalidatePath(encodeURI(oldPath))

    if (previousDoc.slug === 'home') {
      revalidatePath('')
      revalidatePath('/')
    }

    revalidateTag('pages-sitemap')
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    return doc
  }

  const path = `/${doc.slug ?? ''}`
  revalidatePath(encodeURI(path))

  if (doc.slug === 'home') {
    revalidatePath('')
    revalidatePath('/')
  }

  revalidateTag('pages-sitemap')

  return doc
}
