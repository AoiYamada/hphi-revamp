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
import { DefaultLink, FeaturedLink, ListLinks } from '../Links'

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
          <ul className="absolute mt-28 grid w-full gap-3 border-b border-zinc-200 bg-white px-10 py-8 shadow-xl backdrop-blur-lg">
            <MaxWidthWrapper className="py-0">
              {taps.map(
                ({ label, link, enableDirectLink, enableDropdown, navItems, ...others }, i) => {
                  if (others.description || others.descriptionLinks?.length) {
                    return null
                  }

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
                    <li key={i}>
                      <MenuItem
                        enableDropdown={enableDropdown ?? false}
                        text={text}
                        navItems={navItems}
                      />
                    </li>
                  )
                },
              )}
              <li>
                <Link className="flex w-full items-center font-semibold" href="/pricing">
                  <SearchIcon className="mr-2 h-4 w-4" /> 文章搜尋
                </Link>
              </li>
              {/* <li className="my-3 h-px w-full bg-gray-300" /> */}
            </MaxWidthWrapper>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav

type MenuItemProps = {
  enableDropdown: boolean
  text: JSX.Element
  navItems: NonNullable<HeaderType['tabs']>[number]['navItems']
}

const MenuItem = ({ enableDropdown, text, navItems }: MenuItemProps) => {
  if (enableDropdown) {
    return (
      <Collapsible>
        <CollapsibleTrigger className="group flex flex-row items-center justify-start">
          {text}
          <ChevronRight
            className={cn('ml-1 h-4 w-4 transition-all group-data-[state=open]:rotate-90')}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="collapsible-content pl-4">
          <ul>
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

  return <>{text}</>
}
