import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { hero } from '@/heros/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { Content } from '@/blocks/Content/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { YouTube } from '@/blocks/YouTube/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { revalidateCourse, revalidateDelete } from './hooks/revalidateCourse'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'description',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, YouTube, Archive, FormBlock],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'timeSlots',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'time',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'date',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'tutors',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'closed',
                  type: 'checkbox',
                  defaultValue: false,
                  required: true,
                },
              ],
            },
          ],
          label: 'Time slots',
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
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateCourse],
    beforeDelete: [revalidateDelete],
  },
}
