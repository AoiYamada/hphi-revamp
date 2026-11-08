import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import Link from 'next/link'
import Logo from '@/components/Logo'
import GoogleTranslate from '@/components/GoogleTranslate'
import MainNav from './MainNav'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import MobileNav from './MobileNav'
import Announcement from './Announcement'
import { HeaderHeightScript } from './HeaderHeightScript'
import { HeaderHeightVar } from './HeaderHeightVar'
import SocialStrip from './SocialStrip'
import { DismissalGuard } from './Dismissal/DismissalGuard'
import { createDismissal } from './Dismissal/createDismissal'
import { getVisibleContent } from './SocialStrip/channel'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)
  const { announcement, socialStrip } = header
  const announcementDismissal = createDismissal('announcement', announcement?.content)
  const socialStripDismissal = createDismissal(
    'social-strip',
    getVisibleContent(socialStrip?.channels),
  )

  return (
    <>
      <DismissalGuard entries={[socialStripDismissal, announcementDismissal]} />
      <HeaderHeightVar />
      <SocialStrip {...socialStrip} dismissal={socialStripDismissal} />
      <header
        data-site-header
        className="sticky top-0 z-50 w-full border-b border-chrome-header-border bg-chrome-header/80 text-chrome-text backdrop-blur-md backdrop-saturate-150"
      >
        <Announcement {...announcement} dismissal={announcementDismissal} />
        <MaxWidthWrapper>
          <div className="flex h-16 w-full items-center justify-between px-2 lg:h-20">
            <Link href="/" className="flex items-center" aria-label="HPHI home">
              <Logo noText={false} />
            </Link>
            <MainNav header={header} className="hidden lg:block" />
            <MobileNav header={header} className="lg:hidden" />
          </div>
        </MaxWidthWrapper>
        {/* Hangs off the header's bottom edge so it follows the header whatever sits above it.
            The article reading bar sits in that spot, so article.css moves the widget down while it shows. */}
        <div data-translate-widget className="absolute right-4 top-full mt-4">
          <GoogleTranslate />
        </div>
      </header>
      <HeaderHeightScript />
    </>
  )
}
