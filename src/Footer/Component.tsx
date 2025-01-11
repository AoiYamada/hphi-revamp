import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import Logo from '@/components/Logo'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import FooterNavColumn from './FooterNavColumn'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')

  const columns = footer?.columns || []

  return (
    <footer id="footer" className="border-t border-border bg-[#18181b] text-secondary-foreground">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-16 pb-4 pt-12">
        <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-16 items-start">
          <Link className="flex flex-grow pb-8 items-center" href="/">
            <picture>
              <Logo className="w-32 invert" noText />
            </picture>
          </Link>
          {columns.length > 0 &&
            columns.map((column, i) => <FooterNavColumn key={i} {...column} />)}
        </div>
        <div className="w-full text-xs font-light">
          <p className="leading-6">
            Copyright © {new Date().getFullYear()} HPHI EDUCATION LIMITED All rights reserved
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
