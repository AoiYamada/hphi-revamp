import { FormBuilderPluginConfig } from 'node_modules/@payloadcms/plugin-form-builder/dist/types'
import { Date, Radio, Select } from '@/blocks/Form/custom-fields'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { PaginatedDocs } from 'payload'

const formBuilderPluginConfig: FormBuilderPluginConfig = {
  fields: {
    date: Date,
    radio: Radio,
    select: Select,
    payment: false,
    // uploadImage: UploadImage,
  },
  formOverrides: {
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ('name' in field && field.name === 'confirmationMessage') {
          return {
            ...field,
            editor: lexicalEditor({
              features: ({ rootFeatures }) => {
                return [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  AlignFeature(),
                ]
              },
            }),
          }
        }
        return field
      })
    },
  },
  formSubmissionOverrides: {
    admin: {
      components: {
        beforeListTable: [
          '@/components/FormSubmissionOverrides/BeforeListTableComponent/index#BeforeListTableComponent',
        ],
      },
    },
    endpoints: [
      {
        path: '/export',
        method: 'post',
        handler: async ({ user, payload }) => {
          if (!user) {
            return Response.json({ error: 'forbidden' }, { status: 403 })
          }

          const submissions: PaginatedDocs<{
            id: string
            submissionData?:
              | {
                  field: string
                  value: string
                  id?: string | null
                }[]
              | null
              | undefined
          }>['docs'] = []
          const limit = 100
          let finished = false
          let page = 1

          while (!finished) {
            const data = await payload.find({
              collection: 'form-submissions',
              limit,
              page,
              overrideAccess: true,
              pagination: true,
              select: {
                submissionData: true,
              },
              where: {
                form: {
                  // nlp course form id, hardcoded for simplicity, looks like this function will not change in the future
                  equals: '6773c373f798810fcdddf5ce',
                },
              },
            })

            if (data.docs.length < limit) {
              finished = true
            }

            page++

            submissions.push(...data.docs)
          }

          // Convert to CSV with specific fields
          const csv = convertSubmissionsToCSV(submissions)

          // Return CSV response
          return new Response(csv, {
            headers: {
              'Content-Type': 'text/csv',
              'Content-Disposition': 'attachment; filename="nlp-course-submissions.csv"',
            },
          })
        },
      },
    ],
  },
}

// Helper function to convert submissions to CSV with specific fields
function convertSubmissionsToCSV(submissions: any[]): string {
  if (submissions.length === 0) {
    return 'Student Name,Education Background,Working Experience\n'
  }

  // Define the fields we want to export and their corresponding headers
  const fieldMapping = {
    name: 'Student Name',
    education_level: 'Education Background',
    working_experience: 'Working Experience',
  }

  // Create CSV header row
  const headers = Object.values(fieldMapping)
  const headerRow = headers.join(',') + '\n'

  // Create data rows
  const dataRows = submissions.map((submission) => {
    const rowData: string[] = []

    // For each field in our mapping, find the value in submissionData
    Object.keys(fieldMapping).forEach((fieldName) => {
      const fieldData = submission.submissionData?.find((field: any) => field.field === fieldName)

      const value = fieldData?.value || ''
      rowData.push(escapeCSVValue(value))
    })

    return rowData.join(',')
  })

  return headerRow + dataRows.join('\n')
}

// Helper function to properly escape CSV values
function escapeCSVValue(value: any): string {
  if (value === null || value === undefined) {
    return ''
  }

  const stringValue = String(value)

  // If value contains commas, quotes, or newlines, wrap in quotes and escape existing quotes
  if (
    stringValue.includes(',') ||
    stringValue.includes('"') ||
    stringValue.includes('\n') ||
    stringValue.includes('\r')
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

export default formBuilderPluginConfig
