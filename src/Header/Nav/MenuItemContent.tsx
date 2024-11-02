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
    <NavigationMenuContent className="p-4 w-[630px]">
      <div className="flex flex-row gap-4">
        {description || (descriptionLinks?.length ?? 0 > 0) ? (
          <div className="flex flex-col gap-4 shrink-0 w-[180px] pt-1">
            {description && <p className="text-sm font-bold">{description}</p>}
            {descriptionLinks?.length ? (
              <ul className="flex flex-col gap-2">
                {descriptionLinks.map(({ link }, i) => (
                  <li key={i} className="flex flex-row gap-2 items-center">
                    <CMSLink key={i} {...link} appearance="link" />
                    <ExternalLink className="w-4 h-4" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        {navItems?.length ? (
          <ul className="flex flex-row flex-wrap gap-4 w-[360px]">
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

              return (
                <li key={i} className="w-[150px]">
                  {item}
                </li>
              )
            })}
          </ul>
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
    <div className="flex flex-col gap-4 w-full">
      <CMSLink {...link} appearance="link" />
      {description && <p className="text-sm">{description}</p>}
    </div>
  )
}

type ListLinksProps = NonNullable<
  NonNullable<MenuItemContentProps['navItems']>[number]['listLinks']
>

const ListLinks: FC<ListLinksProps> = ({ tag, links }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="font-bold">{tag}</p>
      {links && links.length > 0 && (
        <ul className="flex flex-col gap-2 pl-2">
          {links.map(({ link }, i) => (
            <li key={i}>
              <CMSLink {...link} appearance="link" />
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

const FeaturedLink: FC<FeaturedLinkProps> = ({ tag, label, links }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {tag && <p className="font-bold">{tag}</p>}
      {label && <RichText content={label} enableGutter={false} className="pl-2" />}
      {links && links.length > 0 && (
        <ul className="flex flex-col gap-2 pl-2">
          {links.map((link, i) => (
            <li key={i}>
              <CMSLink {...link} appearance="link" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
