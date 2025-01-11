import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { FC } from 'react'
import { cn } from '@/utilities'

type MenuItemLabelProps = Pick<
  NonNullable<HeaderType['tabs']>[number],
  'label' | 'enableDirectLink' | 'link'
> & { className?: string }

const MenuItemLabel: FC<MenuItemLabelProps> = ({ label, enableDirectLink, link, className }) => {
  return enableDirectLink ? (
    <CMSLink label={label} {...link} appearance="link" className={className} />
  ) : (
    <div className={cn('text-primary', className)}>{label}</div>
  )
}

export default MenuItemLabel
