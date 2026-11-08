import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { CEFCalculatorBlock } from '@/blocks/CEFCalculator/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  YouTube as YouTubeProps,
  CollapsibleBlock as CollapsibleProps,
  QuoteBlock as QuoteBlockProps,
  CEFCalculatorBlock as CEFCalculatorBlockProps,
  TabsBlock as TabsBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities'
import { FC, HTMLAttributes } from 'react'
import { FormBlock, FormBlockType } from '@/blocks/Form/Component'
import { YouTube } from '@/blocks/YouTube/Component'
import { CollapsibleBlock } from '@/blocks/Collapsible/Component'
import { QuoteBlock } from '@/blocks/Quote/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | YouTubeProps
      | BannerBlockProps
      | CodeBlockProps
      | FormBlockType
      | CollapsibleProps
      | QuoteBlockProps
      | CEFCalculatorBlockProps
      | TabsBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${slug}`
}

/**
 * `annotateH2Anchors` (src/utilities/article/headings.ts) adds these to the top-level H2 nodes of
 * an article. They only exist on article content, so other rich text renders headings unchanged.
 */
type AnchoredHeadingNode = SerializedHeadingNode & { anchorId?: string; anchorNumber?: string }

const HEADING_TAGS: ReadonlySet<string> = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

/**
 * Lexical formats that mean "no alignment chosen". Under the old left-aligned design they changed
 * nothing visually, so an editor did not pick them on purpose (see `heading` below).
 */
const DEFAULT_ALIGN_FORMATS: ReadonlySet<string> = new Set(['start', 'left'])

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Same output as the default converter, plus `id` and `data-number` when the node is anchored.
  // The number itself is drawn by `h2[data-number]::before` in styles/article.css.
  //
  // R22: the article design centres H2s. Old content often has H2s saved with format `start`, which
  // the library renders as an inline `text-align: left`. For the article's anchored H2s that value is
  // treated as the default, so no inline alignment is emitted and the stylesheet's centring applies.
  // `center`, `right`/`end` and `justify` are still written inline as usual. Headings that are not
  // anchored (pages, nested rich text, H3/H4) keep every alignment exactly as before.
  heading: ({ node, nodesToJSX }) => {
    const { anchorId, anchorNumber } = node as AnchoredHeadingNode
    const Tag = (HEADING_TAGS.has(node.tag) ? node.tag : 'h1') as 'h1'
    const useDesignAlignment =
      node.tag === 'h2' && anchorId !== undefined && DEFAULT_ALIGN_FORMATS.has(node.format)
    // The library merges its own style under the one we return, so an undefined value cancels it.
    const style = useDesignAlignment ? { textAlign: undefined } : undefined

    return (
      <Tag id={anchorId} data-number={anchorNumber} style={style}>
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        imgClassName="m-0 mx-auto"
        videoClassName="m-0 mx-auto"
        {...node.fields}
        captionClassName="mx-auto max-w-3xl"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    youtubeBlock: ({ node }) => <YouTube {...node.fields} />,
    code: ({ node }) => <CodeBlock {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    formBlock: ({ node }) => <FormBlock className="p-0 md:p-0" {...node.fields} />,
    collapsibleBlock: ({ node }) => <CollapsibleBlock {...node.fields} />,
    quoteBlock: ({ node }) => <QuoteBlock {...node.fields} />,
    cefCalculatorBlock: ({ node }) => <CEFCalculatorBlock {...node.fields} />,
    tabsBlock: ({ node }) => <TabsBlock {...node.fields} />,
  },
})

type RichTextProps = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & HTMLAttributes<HTMLDivElement>

const RichText: FC<RichTextProps> = ({
  className,
  enableProse = true,
  enableGutter = true,
  ...rest
}) => {
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'w-full': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
export default RichText
