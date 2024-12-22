import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Course } from '../../../payload-types'

export const revalidateCourse: CollectionAfterChangeHook<Course> = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate || !doc) {
    return doc
  }

  const path = `/courses/${doc.slug}`

  payload.logger.info(`Revalidating page at path: ${path}`)

  revalidatePath(path)
  revalidateTag('pages-sitemap')

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Course> = ({ doc, req: { context } }) => {
  if (context.disableRevalidate || !doc) {
    return doc
  }

  const path = `/courses/${doc.slug}`
  revalidatePath(path)
  revalidateTag('pages-sitemap')

  return doc
}
