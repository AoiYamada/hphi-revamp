import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (_, siblingData) =>
          Boolean(
            typeof siblingData.media === 'object' && siblingData.media.mimeType?.includes('video'),
          ),
      },
    },
  ],
}
