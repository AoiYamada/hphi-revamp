import RichText from '@/components/RichText'
import { MenuItemContentProps } from './MenuItemContent'
import { FC } from 'react'
import { CMSLink } from '@/components/Link'

type DefaultLinkProps = NonNullable<
  NonNullable<MenuItemContentProps['navItems']>[number]['defaultLink']
>

export const DefaultLink: FC<DefaultLinkProps> = ({ link, description }) => {
  return (
    <div className="space-y-2">
      <CMSLink
        {...link}
        appearance="inline"
        className="text-lg font-medium text-foreground whitespace-break-spaces"
      />
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}

type ListLinksProps = NonNullable<
  NonNullable<MenuItemContentProps['navItems']>[number]['listLinks']
>

export const ListLinks: FC<ListLinksProps> = ({ label, links }) => {
  return (
    <div className="space-y-3">
      {label && <p className="text-lg font-medium text-foreground">{label}</p>}
      {links && links.length > 0 && (
        <ul className="space-y-2">
          {links.map(({ link }, i) => (
            <li key={i}>
              <CMSLink
                {...link}
                appearance="link"
                className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-200 ease-out whitespace-break-spaces"
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

export const FeaturedLink: FC<FeaturedLinkProps> = ({ label, content, links }) => {
  return (
    <div className="space-y-3">
      {label && <p className="text-lg font-medium text-foreground">{label}</p>}
      {content && (
        <div>
          <RichText data={content} enableGutter={false} />
        </div>
      )}
      {links && links.length > 0 && (
        <ul className="space-y-2">
          {links.map(({ link }, i) => (
            <li key={i}>
              <CMSLink
                {...link}
                appearance="link"
                className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-200 ease-out whitespace-break-spaces"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
