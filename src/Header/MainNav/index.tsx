'use client'

import type { FC } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import MenuItemLabel from '../MenuItemLabel'
import MenuItemContent from './MenuItemContent'
import { cn } from '@/utilities'

type HeaderNavProps = { header: HeaderType; className?: string }

const HeaderNav: FC<HeaderNavProps> = ({ header, className }) => {
  const taps = header?.tabs || []

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {taps.map(({ label, link, enableDirectLink, enableDropdown, ...content }, i) => {
          const text = (
            <MenuItemLabel
              label={label}
              enableDirectLink={enableDirectLink}
              link={link}
              className={cn({
                'py-2 px-4': !enableDropdown,
              })}
            />
          )

          return (
            <NavigationMenuItem key={i}>
              {enableDropdown ? <NavigationMenuTrigger>{text}</NavigationMenuTrigger> : text}
              {enableDropdown && <MenuItemContent {...content} />}
            </NavigationMenuItem>
          )
        })}
        <NavigationMenuItem className="py-2 px-4">
          <Link href="/search" legacyBehavior passHref>
            <NavigationMenuLink>
              <span className="sr-only">文章搜尋</span>
              <SearchIcon className="w-5 text-primary" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default HeaderNav
