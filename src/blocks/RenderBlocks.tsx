import React, { FC } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { YouTube } from '@/blocks/YouTube/Component'
import { CollapsibleBlock } from './Collapsible/Component'
import { TimeSlotBlock } from './TimeSlot/Component'
import { TimelineBlock } from './Timeline/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  youtubeBlock: YouTube,
  collapsibleBlock: CollapsibleBlock,
  timeSlotBlock: TimeSlotBlock,
  timelineBlock: TimelineBlock,
}

export const RenderBlocks: FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            return (
              <div className="my-8" key={index}>
                {/* @ts-ignore */}
                <Block {...block} />
              </div>
            )
          }
        }
        return null
      })}
    </>
  )
}
