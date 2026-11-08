'use client'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities'
import { sendGAEvent } from '@next/third-parties/google'
import { ArrowUpRight } from 'lucide-react'
import NextImage from 'next/image'
import type { FC } from 'react'
import type { RenderableSocialChannel } from './channel'

type SocialChannelCardProps = RenderableSocialChannel & {
  showCaptionOnMobile: boolean
}

// On desktop the QR is for scanning with a phone; on mobile (where you can't scan your own
// screen) the whole card is a tap target that opens the platform directly.
const SocialChannelCard: FC<SocialChannelCardProps> = ({
  name,
  qrCode,
  link,
  caption,
  showCaptionOnMobile,
}) => {
  return (
    <CMSLink
      {...link}
      newTab
      onClick={() => sendGAEvent('event', 'social_strip_click', { channel: name })}
      className="group flex h-full flex-col gap-1.5 rounded-sm focus-visible:outline-hidden focus-visible:shadow-focus md:gap-2 xl:flex-row xl:items-center xl:gap-4"
    >
      {/* QR 外框用純白（chrome-qr token，和原版一樣）：QR 圖本身是不透明的白底，外框若不同色會變成雙層框。
          手機約 64px（較緊湊），md 以上維持原本的尺寸。 */}
      <span className="relative block aspect-square size-16 shrink-0 rounded-sm bg-chrome-qr p-1 md:size-30 xl:size-26">
        <NextImage
          src={qrCode.url}
          alt={qrCode.alt || `${name} QR code`}
          width={qrCode.width ?? 1024}
          height={qrCode.height ?? 1024}
          sizes="(min-width: 1280px) 104px, (min-width: 768px) 120px, 160px"
          className="size-full"
        />
        <ArrowUpRight
          aria-hidden
          className="absolute -right-1.5 -top-1.5 size-5 rounded-full bg-chrome-announcement p-0.5 text-chrome-announcement-foreground lg:hidden"
        />
      </span>
      {caption ? (
        <span
          className={cn(
            'min-w-0 whitespace-pre-line wrap-break-word text-xs leading-tight text-chrome-text md:leading-snug xl:text-sm/5',
            showCaptionOnMobile ? 'block' : 'hidden md:block',
          )}
        >
          {caption}
        </span>
      ) : null}
      {/* Without any text the QR codes are indistinguishable, so fall back to the platform name */}
      {!caption || !showCaptionOnMobile ? (
        <span
          className={cn('block min-w-0 truncate text-xs font-medium text-chrome-text xl:text-sm', {
            'md:hidden': caption,
          })}
        >
          {name}
        </span>
      ) : null}
    </CMSLink>
  )
}

export default SocialChannelCard
