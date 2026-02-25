import { link } from '@/fields/link'
import {
  AlignFeature,
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

import { Code } from '../Code/config'
import { MediaBlock } from '../MediaBlock/config'
import { YouTube } from '../YouTube/config'
import { FormBlock } from '../Form/config'
import { Collapsible } from '../Collapsible/config'
import { Quote } from '../Quote/config'
import { CEFCalculator } from '../CEFCalculator/config'
import { Content } from '../Content/config'

export const Tabs: Block = {
  slug: 'tabsBlock',
  interfaceName: 'TabsBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      label: 'Tab Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'enableDirectLink',
          type: 'checkbox',
          label: 'Enable Direct Link',
        },
        {
          name: 'directLink',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData.enableDirectLink,
          },
          fields: [
            link({
              appearances: false,
              disableLabel: true,
            }),
          ],
        },
        {
          name: 'content',
          type: 'richText',
          admin: {
            condition: (_, siblingData) => !siblingData.enableDirectLink,
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                BlocksFeature({
                  blocks: [
                    Code,
                    Content,
                    MediaBlock,
                    YouTube,
                    FormBlock,
                    Collapsible,
                    Quote,
                    CEFCalculator,
                  ],
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                AlignFeature(),
                EXPERIMENTAL_TableFeature(),
              ]
            },
          }),
          required: true,
        },
      ],
    },
  ],
  labels: {
    singular: 'Tabs Block',
    plural: 'Tabs Blocks',
  },
}
