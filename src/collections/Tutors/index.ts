import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateDelete, revalidateTutor } from './hooks/revalidateTutor'

export const Tutors: CollectionConfig = {
  slug: 'tutors',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    title: true,
    image: true,
    qualifications: true,
    description: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['name', 'title', 'priority', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'qualifications',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField('name'),
    {
      name: 'priority',
      type: 'number',
      min: 1,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateTutor],
    beforeDelete: [revalidateDelete],
  },
}

export default Tutors
