import { Block } from 'payload'

export const Quote: Block = {
  slug: 'quoteBlock',
  interfaceName: 'QuoteBlock',
  fields: [
    {
      label: 'Quote',
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      label: 'Author',
      name: 'author',
      type: 'text',
      required: true,
    },
  ],
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
}
