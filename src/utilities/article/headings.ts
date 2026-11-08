import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { TocHeading } from './types'

type LexicalLike = {
  type?: string
  tag?: string
  text?: string
  children?: ReadonlyArray<LexicalLike>
}

const collectText = (node: LexicalLike): string =>
  (typeof node.text === 'string' ? node.text : '') + (node.children ?? []).map(collectText).join('')

const isH2 = (node: LexicalLike): boolean => node.type === 'heading' && node.tag === 'h2'

const hasText = (node: LexicalLike): boolean => collectText(node).trim() !== ''

/**
 * Adds `anchorId` and `anchorNumber` to each top-level H2 and returns the TOC entries.
 * Does not mutate the input state.
 */
export function annotateH2Anchors(state: SerializedEditorState): {
  state: SerializedEditorState
  headings: TocHeading[]
} {
  const headings: TocHeading[] = []
  const children = state.root.children.map((node) => {
    const lexical: LexicalLike = node
    if (!isH2(lexical)) return node

    const index = headings.length + 1
    const id = `section-${index}`
    const number = String(index).padStart(2, '0')
    headings.push({ id, text: collectText(lexical).trim(), number })
    return { ...node, anchorId: id, anchorNumber: number }
  })

  return {
    state: { ...state, root: { ...state.root, children } },
    headings,
  }
}

/**
 * Splits off the lede: the first non-empty top-level paragraph, once leading empty
 * paragraphs are skipped. `lede` is null when that first node is not a text paragraph.
 * Does not mutate the input state.
 */
export function splitLede(state: SerializedEditorState): {
  lede: SerializedEditorState | null
  body: SerializedEditorState
} {
  const nodes = state.root.children
  const isEmptyParagraph = (node: LexicalLike) => node.type === 'paragraph' && !hasText(node)
  const start = nodes.findIndex((node) => !isEmptyParagraph(node))
  const rest = start === -1 ? [] : nodes.slice(start)
  const withChildren = (children: typeof nodes): SerializedEditorState => ({
    ...state,
    root: { ...state.root, children },
  })

  const [first] = rest
  if (first && first.type === 'paragraph' && hasText(first)) {
    return { lede: withChildren([first]), body: withChildren(rest.slice(1)) }
  }

  return { lede: null, body: withChildren(rest) }
}
