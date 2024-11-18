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
    <NavigationMenuContent className="grid grid-cols-12 gap-6 p-6 w-fit">
      {(description || (descriptionLinks?.length ?? 0) > 0) && (
        <div className="pt-1 col-span-3 space-y-4 border-r border-gray-200">
          {description && <p className="text-lg font-medium text-gray-900">{description}</p>}
          {descriptionLinks?.length ? (
            <ul className="space-y-3">
              {descriptionLinks.map(({ link }, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CMSLink {...link} appearance="link" />
                  {link.newTab && <ExternalLink className="h-3 w-3 text-gray-400" />}
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
