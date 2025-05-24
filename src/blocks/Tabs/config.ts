import {
  AlignFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

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
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h4'] }),
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
