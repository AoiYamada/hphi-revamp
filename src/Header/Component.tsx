import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)

  return (
    <header className="container relative z-20 py-8 flex justify-between" data-theme="dark">
      <Link href="/">
        <Logo />
      </Link>
      <HeaderNav header={header} />
    </header>
  )
}
