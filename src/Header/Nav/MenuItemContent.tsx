import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { NavigationMenuContent } from '@/components/ui/navigation-menu'
import type { Header as HeaderType } from '@/payload-types'
import { ExternalLink } from 'lucide-react'
import { FC, ReactNode } from 'react'

type MenuItemContentProps = Omit<
  NonNullable<HeaderType['tabs']>[number],
  'label' | 'link' | 'enableDirectLink' | 'enableDropdown'
>

const MenuItemContent: FC<MenuItemContentProps> = ({ description, descriptionLinks, navItems }) => {
  return (
    <NavigationMenuContent>
      <div className="grid grid-cols-12 gap-6 p-6 w-[600px]">
        {(description || (descriptionLinks?.length ?? 0) > 0) && (
          <div className="col-span-12 pt-1 md:col-span-3 space-y-4 border-r border-gray-200">
            {description && <p className="text-sm font-medium text-gray-900">{description}</p>}
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
            className={`col-span-12 ${description || descriptionLinks?.length ? 'md:col-span-9' : 'md:col-span-12'}`}
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </NavigationMenuContent>
  )
}

export default MenuItemContent

type DefaultLinkProps = NonNullable<
  NonNullable<MenuItemContentProps['navItems']>[number]['defaultLink']
>

const DefaultLink: FC<DefaultLinkProps> = ({ link, description }) => {
  return (
    <div className="space-y-2">
      <CMSLink {...link} appearance="inline" className="font-medium text-gray-900" />
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  )
}

type ListLinksProps = NonNullable<
  NonNullable<MenuItemContentProps['navItems']>[number]['listLinks']
>

const ListLinks: FC<ListLinksProps> = ({ label, links }) => {
  return (
    <div className="space-y-3">
      {label && <p className="font-medium text-gray-900">{label}</p>}
      {links && links.length > 0 && (
        <ul className="space-y-2">
          {links.map(({ link }, i) => (
            <li key={i}>
              <CMSLink
                {...link}
                appearance="link"
                className="text-sm text-gray-600 hover:text-gray-900"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

type FeaturedLinkProps = NonNullable<
  NonNullable<MenuItemContentProps['navItems']>[number]['featuredLink']
>

const FeaturedLink: FC<FeaturedLinkProps> = ({ label, content, links }) => {
  return (
    <div className="space-y-3">
      {label && <p className="font-medium text-gray-900">{label}</p>}
      {content && (
        <div>
          <RichText content={content} enableGutter={false} />
        </div>
      )}
      {links && links.length > 0 && (
        <ul className="space-y-2">
          {links.map(({ link }, i) => (
            <li key={i}>
              <CMSLink
                {...link}
                appearance="link"
                className="text-sm text-gray-600 hover:text-gray-900"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
