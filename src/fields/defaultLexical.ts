import { Config, TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  AlignFeature,
  LinkFields,
  UnorderedListFeature,
  OrderedListFeature,
  IndentFeature,
} from '@payloadcms/richtext-lexical'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      // PRed: https://github.com/payloadcms/payload/pull/11713
      LinkFeature({
        enabledCollections: ['pages', 'posts', 'courses', 'tutors'],
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'url') {
              return {
                name: 'url',
                type: 'text',
                admin: {
                  condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
                validate: ((value, options) => {
                  if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                    return true // no validation needed, as no url should exist for internal links
                  }
                  return value ? true : 'URL is required'
                }) as TextFieldSingleValidation,
              }
            }
            return field
          })
        },
      }),
      AlignFeature(),
      // 列點清單、數字清單：工具列有按鈕，也可以打「- 」或「1. 」再空格自動變成清單（和 Notion、Google Docs 一樣）。
      UnorderedListFeature(),
      OrderedListFeature(),
      // 縮排（Tab／Shift+Tab 或工具列按鈕）只給清單用，做出巢狀清單；段落和標題不縮排，以免打亂版面。
      IndentFeature({ disabledNodes: ['paragraph', 'heading'] }),
    ]
  },
})
