import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Collapsible: Block = {
  slug: 'collapsibleBlock',
  interfaceName: 'CollapsibleBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      label: 'Collapsible Items',
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
              ]
            },
          }),
          required: true,
        },
      ],
    },
  ],
  labels: {
    singular: 'Collapsible Block',
    plural: 'Collapsible Blocks',
  },
}
