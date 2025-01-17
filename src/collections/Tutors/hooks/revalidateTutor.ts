import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Course } from '../../../payload-types'

export const revalidateTutor: CollectionAfterChangeHook<Course> = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate || !doc) {
    return doc
  }

  const path = `/tutors/${doc.slug}`
  payload.logger.info(`Revalidating page at path: ${path}`)

  revalidatePath(encodeURI(path))
  revalidatePath('/tutors')
  revalidateTag('pages-sitemap')

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Course> = ({ doc, req: { context } }) => {
  if (context.disableRevalidate || !doc) {
    return doc
  }

  const path = `/tutors/${doc.slug}`
  revalidatePath(encodeURI(path))
  revalidatePath('/tutors')
  revalidateTag('pages-sitemap')

  return doc
}
