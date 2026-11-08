import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

const DEFAULT_CHARS_PER_MINUTE = 400

type LexicalLike = {
  type?: string
  text?: string
  children?: ReadonlyArray<LexicalLike>
}

const countNonWhitespace = (value: string): number => [...value.replace(/\s/g, '')].length

const countTextChars = (nodes: ReadonlyArray<LexicalLike>): number =>
  nodes.reduce((total, node) => {
    const own =
      node.type === 'text' && typeof node.text === 'string' ? countNonWhitespace(node.text) : 0
    return total + own + countTextChars(node.children ?? [])
  }, 0)

/** Estimates reading time in whole minutes (rounded up, minimum 1) from the rich text body. */
export function estimateReadingMinutes(
  state: SerializedEditorState,
  charsPerMinute: number = DEFAULT_CHARS_PER_MINUTE,
): number {
  const chars = countTextChars(state.root.children)
  return Math.max(1, Math.ceil(chars / charsPerMinute))
}
