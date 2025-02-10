import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  YouTube as YouTubeProps,
  CollapsibleBlock as CollapsibleProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/cn'
import { FC, HTMLAttributes } from 'react'
import { FormBlock, FormBlockType } from '@/blocks/Form/Component'
import { YouTube } from '@/blocks/YouTube/Component'
import { CollapsibleBlock } from '@/blocks/Collapsible/Component'

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
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0 mx-auto"
        videoClassName="m-0 mx-auto"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    youtubeBlock: ({ node }) => <YouTube className="col-start-2" {...node.fields} />,
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    formBlock: ({ node }) => <FormBlock className="col-start-2 p-0 md:p-0" {...node.fields} />,
    collapsibleBlock: ({ node }) => (
      <div className="col-start-2">
        <CollapsibleBlock {...node.fields} />
      </div>
    ),
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
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
export default RichText
