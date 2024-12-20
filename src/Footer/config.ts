import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'label',
          required: true,
          type: 'text',
        },
        {
          type: 'checkbox',
          name: 'enableDirectLink',
        },
        {
          label: 'Direct Link',
          type: 'collapsible',
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
          name: 'navItems',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'none',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'WhatsApp',
                  value: 'whatsapp',
                },
                {
                  label: 'Instagram',
                  value: 'instagram',
                },
                {
                  label: 'YouTube',
                  value: 'youtube',
                },
                {
                  label: 'Facebook',
                  value: 'facebook',
                },
                {
                  label: 'Mail',
                  value: 'mail',
                },
                {
                  label: 'Phone',
                  value: 'phone',
                },
              ],
            },
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 5,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
