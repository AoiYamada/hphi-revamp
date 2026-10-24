import type { GlobalConfig, TextFieldSingleValidation } from 'payload'

import { authenticated } from '@/access/authenticated'
import { DEFAULT_ORDERING_TERMS, DEFAULT_WHATSAPP_NUMBER } from './defaults'
import { revalidateBookOrdering } from './hooks/revalidateBookOrdering'

// wa.me links take the international number as bare digits: no "+", spaces or dashes.
const validateWhatsAppNumber: TextFieldSingleValidation = (value) => {
  if (!value) return 'Required.'

  return (
    /^\d{8,15}$/.test(value) ||
    'Digits only, starting with the country code (e.g. 85293098317). No "+", spaces or dashes.'
  )
}

export const BookOrdering: GlobalConfig = {
  slug: 'bookOrdering',
  label: 'Book Ordering',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    description:
      'Shared by every Book List, so all pages send Order Requests to the same number and promise the same terms.',
  },
  fields: [
    {
      name: 'whatsAppNumber',
      label: 'WhatsApp number',
      type: 'text',
      required: true,
      defaultValue: DEFAULT_WHATSAPP_NUMBER,
      validate: validateWhatsAppNumber,
      admin: {
        description: 'Receives Order Requests.',
      },
    },
    {
      name: 'orderingTerms',
      type: 'textarea',
      required: true,
      defaultValue: DEFAULT_ORDERING_TERMS,
      admin: {
        description: 'Shown at the end of every Book List, e.g. postage and signing.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateBookOrdering],
  },
}
