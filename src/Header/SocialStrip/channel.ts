import type { Header, Media } from '@/payload-types'

export type SocialChannel = NonNullable<NonNullable<Header['socialStrip']>['channels']>[number]

export type RenderableSocialChannel = SocialChannel & { qrCode: Media & { url: string } }

// A channel whose QR media was deleted (or isn't populated) has nothing to show.
export const isRenderable = (channel: SocialChannel): channel is RenderableSocialChannel =>
  typeof channel.qrCode === 'object' && Boolean(channel.qrCode?.url)

// Only what visitors see, for the dismissal hash: editing media metadata (alt text, focal point)
// or a linked page must not re-show the strip to everyone who closed it.
export const getVisibleContent = (channels: SocialChannel[] | null | undefined) =>
  channels?.filter(isRenderable).map(({ name, qrCode, link, caption }) => ({
    name,
    caption,
    qrCode: qrCode.url,
    link:
      link?.type === 'reference'
        ? typeof link.reference?.value === 'object'
          ? link.reference.value.id
          : link.reference?.value
        : link?.url,
  }))
