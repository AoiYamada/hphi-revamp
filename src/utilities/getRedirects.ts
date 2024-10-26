import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache } from 'next/cache'

export async function getRedirects(depth = 1) {
  const payload = await getPayloadHMR({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
  })

  return redirects
}

/**
 * Cache all redirects together to avoid multiple fetches.
 */
export const getCachedRedirects = () =>
  unstable_cache(async () => getRedirects(), ['redirects'], {
    tags: ['redirects'],
  })()
// export const getCachedRedirects = async () => {
//   'use cache'
//   const redirects = await getRedirects()

//   return redirects
// }
