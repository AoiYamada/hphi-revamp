'use client'

import { CMSLink, CMSLinkType } from '@/components/Link'
import { FC, JSX, PropsWithChildren } from 'react'

export type FooterNavLinkProps = {
  icon?: JSX.Element
  link: CMSLinkType
}

const FooterNavLink: FC<FooterNavLinkProps> = ({ icon, link }) => {
  return (
    <li className="flex flex-row items-center justify-start gap-3">
      {icon ? <IconWrapper>{icon}</IconWrapper> : null}
      <CMSLink
        {...link}
        appearance="link"
        className="text-chrome-footer-foreground/80 transition-colors duration-200 ease-out hover:text-chrome-footer-foreground focus-visible:shadow-focus-inverse"
      />
    </li>
  )
}

export default FooterNavLink

const IconWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex size-5 flex-row items-center justify-center text-chrome-footer-foreground/70">
      {children}
    </div>
  )
}
