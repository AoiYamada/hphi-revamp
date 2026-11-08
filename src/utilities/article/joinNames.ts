const NAME_SEPARATOR = '、'

/** Joins author names with 「、」, dropping empty or whitespace-only entries. */
export function joinNames(names: ReadonlyArray<string>): string {
  return names
    .map((name) => name.trim())
    .filter((name) => name !== '')
    .join(NAME_SEPARATOR)
}
