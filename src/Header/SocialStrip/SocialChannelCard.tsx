'use client'

import { CMSLink } from '@/components/Link'
import type { Header } from '@/payload-types'
import { cn } from '@/utilities'
import { sendGAEvent } from '@next/third-parties/google'
import { ArrowUpRight } from 'lucide-react'
import NextImage from 'next/image'
import type { FC } from 'react'

export type SocialChannel = NonNullable<NonNullable<Header['socialStrip']>['channels']>[number]

type SocialChannelCardProps = SocialChannel & {
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
  if (typeof qrCode !== 'object' || !qrCode?.url) return null

  return (
    <CMSLink
      {...link}
      newTab
      onClick={() => sendGAEvent('event', 'social_strip_click', { channel: name })}
      className="group flex h-full flex-col gap-2 rounded-lg focus-visible:outline-none focus-visible:shadow-lift-focus xl:flex-row xl:items-center xl:gap-4"
    >
      <span className="relative block size-[7.5rem] shrink-0 rounded-md bg-white p-1 shadow-lift-1 transition-shadow duration-200 ease-out group-hover:shadow-lift-2 xl:size-[6.5rem]">
        <NextImage
          src={qrCode.url}
          alt={qrCode.alt || `${name} QR code`}
          width={qrCode.width ?? 1024}
          height={qrCode.height ?? 1024}
          sizes="(min-width: 1280px) 104px, 120px"
          className="size-full"
        />
        <ArrowUpRight
          aria-hidden
          className="absolute -right-1.5 -top-1.5 size-5 rounded-full bg-primary p-0.5 text-primary-foreground lg:hidden"
        />
      </span>
      {caption ? (
        <span
          className={cn(
            'min-w-0 whitespace-pre-line break-words text-xs leading-snug text-foreground xl:text-sm',
            showCaptionOnMobile ? 'block' : 'hidden md:block',
          )}
        >
          {caption}
        </span>
      ) : null}
      {/* Without any text the QR codes are indistinguishable, so fall back to the platform name */}
      {!caption || !showCaptionOnMobile ? (
        <span
          className={cn('block min-w-0 truncate text-xs font-medium text-foreground xl:text-sm', {
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
