import type { Post } from '@/payload-types'

/** Joins several category names into one label: 身心語言程式學 (NLP) · 溝通 */
export const CATEGORY_SEPARATOR = ' · '

/**
 * Titles of the categories that came back populated, in order. Ids that were not populated and
 * categories without a title are skipped, so callers can show a label only when this is non-empty.
 */
export const categoryTitles = (categories: Post['categories']): string[] =>
  (categories ?? []).flatMap((category) => {
    if (typeof category !== 'object' || category === null) return []
    const title = category.title?.trim()
    return title ? [title] : []
  })
