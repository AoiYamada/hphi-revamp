import type { Block, RelationshipFieldManyValidation } from 'payload'

// `required` would also fire while the field is hidden in "All books" mode.
const validateSelectedBooks: RelationshipFieldManyValidation = (value, { siblingData }) => {
  const { populateBy } = (siblingData ?? {}) as { populateBy?: string }
  if (populateBy !== 'selection') return true

  return (Array.isArray(value) && value.length > 0) || 'Pick at least one book.'
}

export const BookList: Block = {
  slug: 'bookListBlock',
  interfaceName: 'BookListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: '曾出版書籍',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'all',
      options: [
        {
          label: 'All books',
          value: 'all',
        },
        {
          label: 'Individual selection',
          value: 'selection',
        },
      ],
      admin: {
        description: 'All books are listed by priority, and new books appear automatically.',
      },
    },
    {
      name: 'selectedBooks',
      type: 'relationship',
      relationTo: 'books',
      hasMany: true,
      validate: validateSelectedBooks,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
        description: 'Drag to reorder.',
        isSortable: true,
      },
    },
  ],
  labels: {
    singular: 'Book List',
    plural: 'Book Lists',
  },
}
