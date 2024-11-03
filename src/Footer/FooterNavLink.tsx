'use client'

import { CMSLink, CMSLinkType } from '@/components/Link'
import { FC, JSX, PropsWithChildren } from 'react'

export type FooterNavLinkProps = {
  icon?: JSX.Element
  link: CMSLinkType
}

const FooterNavLink: FC<FooterNavLinkProps> = ({ icon, link }) => {
  const handleClick = () => {}

  return (
    <li
      key={link.label}
      className="flex flex-row items-center justify-start gap-3"
      onClick={handleClick}
    >
      {icon ? <IconWrapper>{icon}</IconWrapper> : null}
      <CMSLink {...link} appearance="link" className="text-primary-foreground" />
    </li>
  )
}

export default FooterNavLink

const IconWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-5 w-5 flex-row items-center justify-center rounded-full text-basic">
      {children}
    </div>
  )
}
