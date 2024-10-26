import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    // `\p{Script=Han}` matches any Han script character, which includes Chinese, Japanese, and Korean characters
    // Han script characters in slugs will be url encoded, so we need to decodeURIComponent when parsing the slug
    .replace(/[^\p{Script=Han}\w-]+/gu, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
