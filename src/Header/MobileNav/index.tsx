'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { SearchIcon, Menu, X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { JSX, useEffect, useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/utilities'
import MenuItemLabel from '../MenuItemLabel'
import { DefaultLink, FeaturedLink, ListLinks } from './Links'

type MobileNavProps = {
  header: HeaderType
  className?: string
}

const MobileNav = ({ header, className }: MobileNavProps) => {
  const taps = header?.tabs || []
  const [isOpen, setOpen] = useState<boolean>(false)
  const toggleOpen = () => setOpen((prev) => !prev)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const Icon = isOpen ? X : Menu

  return (
    <div className={className}>
      <Icon
        onClick={toggleOpen}
        className="relative z-50 h-7 w-7 cursor-pointer text-zinc-700 select-none"
      />

      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="mt-28 grid w-full gap-3 bg-white pt-4 px-10 pb-8 shadow-md max-h-[calc(100vh-120px)] overflow-y-auto">
            {taps.map(
              ({ label, link, enableDirectLink, enableDropdown, navItems, ...others }, i) => {
                if (others.description || others.descriptionLinks?.length) {
                  return null
                }

                return (
                  <li key={i}>
                    <MaxWidthWrapper className="p-0">
                      <MenuItem
                        enableDropdown={enableDropdown ?? false}
                        label={label}
                        enableDirectLink={enableDirectLink ?? false}
                        link={link}
                        navItems={navItems}
                      />
                    </MaxWidthWrapper>
                  </li>
                )
              },
            )}
            <li className="group">
              <MaxWidthWrapper className="p-0">
                <Link
                  className="flex w-full items-center text-xl font-bold group-hover:text-red-500"
                  href="/search"
                >
                  文章搜尋 <SearchIcon className="ml-2 h-4 w-4 group-hover:text-red-500" />
                </Link>
              </MaxWidthWrapper>
            </li>
            {/* <li className="my-3 h-px w-full bg-gray-300" /> */}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav

type MenuItemProps = {
  enableDropdown: boolean
  label: string
  link: NonNullable<HeaderType['tabs']>[number]['link']
  enableDirectLink: boolean
  navItems: NonNullable<HeaderType['tabs']>[number]['navItems']
}

const MenuItem = ({ enableDropdown, label, link, enableDirectLink, navItems }: MenuItemProps) => {
  if (enableDropdown) {
    return (
      <Collapsible>
        <CollapsibleTrigger className="group flex flex-row items-center justify-between w-full data-[state=open]:text-red-500 hover:text-red-500 transition-colors">
          <MenuItemLabel
            label={label}
            enableDirectLink={enableDirectLink}
            link={link}
            className={cn(
              'justify-start text-xl font-bold group-data-[state=open]:text-red-500 group-hover:text-red-500 transition-colors',
            )}
          />
          <ChevronRight
            className={cn(
              'ml-1 h-4 w-4 transition-all group-data-[state=open]:rotate-90 group-data-[state=open]:text-red-500',
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="collapsible-content pl-2">
          <ul className="border-l-2 pl-2 py-2 space-y-4">
            {navItems?.map(({ style, defaultLink, featuredLink, listLinks }, i) => {
              let item: JSX.Element | null = null

              switch (style) {
                case 'default':
                  item = <DefaultLink {...defaultLink!} />
                  break
                case 'featured':
                  item = <FeaturedLink {...featuredLink!} />
                  break
                case 'list':
                  item = <ListLinks {...listLinks!} />
                  break
              }

              return <li key={i}>{item}</li>
            })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <MenuItemLabel
      label={label}
      enableDirectLink={enableDirectLink}
      link={link}
      className={cn('text-xl font-bold w-full transition-colors', {
        'hover:text-red-500': enableDirectLink,
      })}
    />
  )
}
