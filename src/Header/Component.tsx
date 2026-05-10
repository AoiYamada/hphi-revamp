import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import Link from 'next/link'
import Logo from '@/components/Logo'
import MainNav from './MainNav'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import MobileNav from './MobileNav'
import Announcement from './Announcement'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)
  const { announcement } = header

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <Announcement {...announcement} />
      <MaxWidthWrapper>
        <div className="flex h-16 w-full items-center justify-between px-2 lg:h-20">
          <Link href="/" className="flex items-center" aria-label="HPHI home">
            <Logo noText={false} />
          </Link>
          <MainNav header={header} className="hidden lg:block" />
          <MobileNav header={header} className="lg:hidden" />
        </div>
      </MaxWidthWrapper>
    </header>
  )
}
