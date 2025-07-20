import { FieldHook } from 'payload'
import { Media } from 'src/payload-types'

// Not work in sibling data when changing media field
export const populateMedia: FieldHook = async ({ value, req, req: { payload } }) => {
  if (!value) return value

  try {
    const mediaDoc: Media = await payload.findByID({
      id: typeof value === 'object' ? value._id : value,
      collection: 'media',
      depth: 0,
      req,
    })

    if (mediaDoc) {
      return mediaDoc
    }

    return value
  } catch (error) {
    console.error('Error populating media:', error)
    return value
  }
}
