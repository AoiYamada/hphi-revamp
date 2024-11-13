'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { CircleDollarSign, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type MobileNavProps = {
  className?: string
}

const MobileNav = ({ className }: MobileNavProps) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const Icon = isOpen ? X : Menu

  return (
    <div className={className}>
      <Icon onClick={toggleOpen} className="relative z-50 h-7 w-7 cursor-pointer text-zinc-700" />

      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute mt-28 grid w-full gap-3 border-b border-zinc-200 bg-white px-10 py-8 shadow-xl backdrop-blur-lg">
            <MaxWidthWrapper>
              <li>
                <Link className="flex w-full items-center font-semibold" href="/pricing">
                  <CircleDollarSign className="mr-2 h-4 w-4" /> Pricing
                </Link>
              </li>
              <li className="my-3 h-px w-full bg-gray-300" />
            </MaxWidthWrapper>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
