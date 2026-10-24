import type { CollectionConfig, NumberFieldSingleValidation } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { revalidateBooks, revalidateBooksOnDelete } from './hooks/revalidateBooks'
import { validateIsbn } from './isbn'

// A book that is not Orderable is still listed (marked 暫停發售), so it may have no price.
const validatePrice: NumberFieldSingleValidation = (value, { siblingData }) => {
  if (value === null || value === undefined) {
    const { orderable } = (siblingData ?? {}) as { orderable?: boolean }
    return orderable ? 'Orderable books need a price.' : true
  }

  if (!Number.isInteger(value) || value < 0) return 'Use a whole number of HKD, 0 or more.'

  return true
}

export const Books: CollectionConfig = {
  slug: 'books',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'price', 'orderable', 'priority', 'updatedAt'],
    description: 'Published books. Feature them on a page with the Book List block.',
    useAsTitle: 'title',
  },
  defaultSort: 'priority',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isbn',
      label: 'ISBN',
      type: 'text',
      validate: validateIsbn,
      admin: {
        description: 'Optional. ISBN-10 or ISBN-13; hyphens and spaces are fine.',
      },
    },
    {
      name: 'cover',
      type: 'group',
      fields: MediaBlock.fields,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Shown when a visitor opens the book. Line breaks are kept.',
      },
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      validate: validatePrice,
      admin: {
        description: 'HKD, whole dollars. Required while the book is orderable.',
        step: 1,
      },
    },
    {
      name: 'orderable',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'Untick to keep showing the book, marked 暫停發售, without letting visitors order it.',
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'number',
      // Required: MongoDB sorts a missing value before 1, which would jump the book to the top.
      required: true,
      min: 1,
      defaultValue: 1,
      admin: {
        description: 'Lower numbers are listed first.',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateBooks],
    afterDelete: [revalidateBooksOnDelete],
  },
}
