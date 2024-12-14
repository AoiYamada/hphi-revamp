import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

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
  },
  admin: {
    defaultColumns: ['name', 'title', 'updatedAt'],
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
      name: 'qualifications',
      type: 'richText',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    ...slugField(),
  ],
  hooks: {
    // afterChange: [revalidateTutor],
    // beforeDelete: [revalidateDelete],
  },
}

export default Tutors
