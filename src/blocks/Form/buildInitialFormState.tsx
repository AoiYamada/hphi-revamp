import { FormFieldBlock } from './custom-fields'

export const buildInitialFormState = (fields: FormFieldBlock[]) => {
  return fields?.reduce((initialSchema, field) => {
    switch (field.blockType) {
      case 'checkbox':
      // TODO: PR to payload-cms to add defaultValue to select field
      case 'select':
      case 'radio':
        return {
          ...initialSchema,
          [field.name]: field.defaultValue,
        }
      case 'country':
      case 'email':
      case 'text':
      case 'state':
      case 'date':
        return {
          ...initialSchema,
          [field.name]: '',
        }
    }
  }, {})
}
