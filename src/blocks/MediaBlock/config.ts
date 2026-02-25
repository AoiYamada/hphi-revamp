import type { Block } from 'payload'
import { populateMedia } from './hooks/populateMedia'

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
      name: 'isVideo',
      type: 'checkbox',
      label: 'Is Video',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional thumbnail for video',
        condition: (_, siblingData) => siblingData.isVideo,
      },
    },
  ],
}
