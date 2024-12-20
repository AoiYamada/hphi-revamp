import type { Block } from 'payload'

export const YouTube: Block = {
  slug: 'youtubeBlock',
  interfaceName: 'YouTube',
  fields: [
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      label: 'YouTube Video URL',
      admin: {
        components: {
          Field: {
            path: '@/fields/youtube/YouTubeComponent#YouTubeComponent',
          },
        },
      },
    },
  ],
  labels: {
    singular: 'YouTube Block',
    plural: 'YouTube Blocks',
  },
}
