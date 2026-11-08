import { CMSLink } from '@/components/Link'
import { NavigationMenuContent } from '@/components/ui/navigation-menu'
import type { Header as HeaderType } from '@/payload-types'
import { cn } from '@/utilities'
import { ExternalLink } from 'lucide-react'
import { FC, ReactNode } from 'react'
import { DefaultLink, FeaturedLink, ListLinks } from './Links'

export type MenuItemContentProps = Omit<
  NonNullable<HeaderType['tabs']>[number],
  'label' | 'link' | 'enableDirectLink' | 'enableDropdown'
>

const MenuItemContent: FC<MenuItemContentProps> = ({ description, descriptionLinks, navItems }) => {
  return (
    // 顏色用原版的 chrome token（下拉選單底色、外框、分隔線、文字），不跟著通用的 popover／border 走。
    <NavigationMenuContent className="grid grid-cols-12 gap-6 p-6 w-fit border-chrome-popover-border bg-chrome-popover text-chrome-text">
      {(description || (descriptionLinks?.length ?? 0) > 0) && (
        <div className="col-span-3 flex flex-col gap-4 border-r border-chrome-popover-border pr-6 pt-1">
          {description && <p className="text-lg font-medium text-chrome-text">{description}</p>}
          {descriptionLinks?.length ? (
            <ul className="flex flex-col gap-3">
              {descriptionLinks.map(({ link }, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CMSLink {...link} appearance="link" className="text-chrome-nav" />
                  {link.newTab && (
                    <ExternalLink className="size-3 text-chrome-text-muted" aria-hidden />
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
      {navItems?.length ? (
        <div
          className={cn('col-span-12', {
            'col-span-9': description || descriptionLinks?.length,
            'col-span-12': !description && !(descriptionLinks?.length ?? 0),
          })}
        >
          <ul
            className={cn('grid grid-cols-1 gap-6', {
              'grid-cols-2': navItems.length === 2,
              'grid-cols-3': navItems.length > 2,
            })}
          >
            {navItems.map(({ style, defaultLink, featuredLink, listLinks }, i) => {
              let item: ReactNode = null

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
        </div>
      ) : null}
    </NavigationMenuContent>
  )
}

export default MenuItemContent
