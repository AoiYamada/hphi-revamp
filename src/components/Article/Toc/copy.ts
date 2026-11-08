/** Fixed copy of the table of contents (spec 5.3 and the global text list). */

export const TOC_LABEL = '目錄'

/** Full-width space (U+3000) used between a number and its title, and inside 「N 節　展開 ▾」. */
export const FULL_WIDTH_SPACE = '　'

export const TOC_EXPAND = '展開 ▾'
export const TOC_COLLAPSE = '收起 ▴'

/** 「N 節」 */
export const sectionCount = (count: number) => `${count} 節`

/** 「04　標題」, the current-section text of the reading bar. */
export const numberedTitle = (number: string, text: string) => `${number}${FULL_WIDTH_SPACE}${text}`

/** Fewer headings than this and no TOC is shown. */
export const MIN_HEADINGS = 2
