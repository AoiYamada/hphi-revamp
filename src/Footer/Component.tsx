import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import Logo from '@/components/Logo'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import FooterNavColumn from './FooterNavColumn'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)

  const columns = footer?.columns || []

  return (
    <footer
      id="footer"
      className="mt-16 border-t border-border bg-anchor text-anchor-foreground"
    >
      <MaxWidthWrapper className="flex flex-col gap-12 pb-10 pt-16 md:pb-14 md:pt-20">
        <div className="flex w-full flex-col items-start justify-between gap-12 md:flex-row md:gap-16">
          <Link className="flex items-center" href="/" aria-label="HPHI home">
            <Logo className="w-32 invert" noText />
          </Link>
          {columns.length > 0 && (
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 md:flex md:w-auto md:flex-row md:gap-16">
              {columns.map((column, i) => (
                <FooterNavColumn key={i} {...column} />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 border-t border-anchor-foreground/15 pt-6 text-xs font-light text-anchor-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-6">
            Copyright © {new Date().getFullYear()} HPHI EDUCATION LIMITED. All rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
