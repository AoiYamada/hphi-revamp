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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur shadow-md">
      <Announcement {...announcement} />
      <MaxWidthWrapper>
        <div className="flex justify-between items-center lg:items-end px-2 w-full">
          <Link href="/">
            <Logo noText={false} />
          </Link>
          <MainNav header={header} className="hidden lg:block" />
          <MobileNav header={header} className="lg:hidden" />
        </div>
      </MaxWidthWrapper>
    </header>
  )
}
