import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 container py-8 flex justify-between items-end">
      <Link href="/">
        <Logo />
      </Link>
      <HeaderNav header={header} />
    </header>
  )
}
