'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import type { Header } from '@/payload-types'
import { sendGAEvent } from '@next/third-parties/google'
import { X } from 'lucide-react'
import type { FC } from 'react'
import { type Dismissal, dismissibleProps } from '@/Header/Dismissal/dismissal'
import { useDismissal } from '@/Header/Dismissal/useDismissal'
import { isRenderable } from './channel'
import SocialChannelCard from './SocialChannelCard'

type SocialStripProps = NonNullable<Header['socialStrip']> & {
  dismissal: Dismissal
}

// Rendered above (not inside) the sticky <header>, so it scrolls away with the page.
// Mobile: a horizontal snap-scroll row with cards sized to show two and a half, so the third
// peeks out as a swipe hint whatever the phone's width.
// Tablet / small desktop: equal-width columns of stacked cards.
// Wide desktop (xl): columns of side-by-side QR + caption; narrower squeezes 4 captions to ~40px.
const SocialStrip: FC<SocialStripProps> = ({
  enable,
  showCaptionOnMobile,
  channels,
  dismissal,
}) => {
  const { isDismissed, dismiss } = useDismissal(dismissal)

  // Skip channels whose QR media was deleted, so they don't leave empty slots
  const visibleChannels = channels?.filter(isRenderable) ?? []

  if (!enable || !visibleChannels.length || isDismissed) return null

  const handleDismiss = () => {
    dismiss()
    sendGAEvent('event', 'social_strip_dismiss')
  }

  return (
    <aside
      {...dismissibleProps(dismissal.id)}
      aria-label="關注我們"
      className="border-b border-border bg-muted/60"
    >
      <MaxWidthWrapper className="flex items-start gap-2 py-3 xl:py-4">
        {/* Mobile card width = (row − the two gap-3 gaps) / 2.5, capped on wide phones */}
        <ul className="-mx-1 -my-2 flex min-w-0 flex-1 snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto px-1 py-2 [scrollbar-width:none] md:mx-0 md:grid md:px-0 md:auto-cols-fr md:grid-flow-col md:gap-6 md:overflow-visible xl:gap-0 xl:divide-x xl:divide-border [&::-webkit-scrollbar]:hidden">
          {visibleChannels.map((channel, i) => (
            <li
              key={channel.id ?? i}
              className="w-[min(calc((100%_-_1.5rem)/2.5),10rem)] shrink-0 snap-start md:w-auto md:min-w-0 xl:px-6 xl:first:pl-0 xl:last:pr-0"
            >
              <SocialChannelCard {...channel} showCaptionOnMobile={showCaptionOnMobile ?? true} />
            </li>
          ))}
        </ul>
        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors duration-200 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:shadow-lift-focus"
          aria-label="Close social strip"
        >
          <X size={14} />
        </button>
      </MaxWidthWrapper>
    </aside>
  )
}

export default SocialStrip
