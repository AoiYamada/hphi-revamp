import RichText from '@/components/RichText'
import { FC } from 'react'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

export type MenuItemContentProps = Omit<
  NonNullable<HeaderType['tabs']>[number],
  'label' | 'link' | 'enableDirectLink' | 'enableDropdown'
>

type DefaultLinkProps = NonNullable<
  NonNullable<MenuItemContentProps['navItems']>[number]['defaultLink']
>

export const DefaultLink: FC<DefaultLinkProps> = ({ link, description }) => {
  return (
    <div className="space-y-2">
      <CMSLink
        {...link}
        appearance="inline"
        className="text-base  font-normal whitespace-break-spaces"
      />
      {description && <p className="text-lg font-medium">{description}</p>}
    </div>
  )
}

type ListLinksProps = NonNullable<
  NonNullable<MenuItemContentProps['navItems']>[number]['listLinks']
>

export const ListLinks: FC<ListLinksProps> = ({ label, links }) => {
  return (
    <div className="space-y-2">
      {label && <p className="text-lg font-medium">{label}</p>}
      {links && links.length > 0 && (
        <ul className="space-y-1 pl-4" style={{ marginTop: '0.25rem' }}>
          {links.map(({ link }, i) => (
            <li key={i}>
              <CMSLink
                {...link}
                appearance="link"
                className="text-base  font-normal whitespace-break-spaces"
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
    <div className="space-y-2">
      {label && <p className="text-lg font-medium">{label}</p>}
      {content && (
        <div>
          <RichText content={content} enableGutter={false} />
        </div>
      )}
      {links && links.length > 0 && (
        <ul className="space-y-1 pl-4" style={{ marginTop: '0.25rem' }}>
          {links.map(({ link }, i) => (
            <li key={i}>
              <CMSLink
                {...link}
                appearance="link"
                className="text-base  font-normal whitespace-break-spaces"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
