'use client'

import React, { FC } from 'react'
import { CMSLink } from './Link'
// import * as pixel from "@/lib/f-pixel";

type SignUpProps = {
  className?: string
  url?: string
}

const SignUp: FC<SignUpProps> = ({ className, url }) => {
  const handleLinkClick = () => {
    document.getElementById('contact-us')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <CMSLink
      type="custom"
      newTab={false}
      url={url || '#contact'}
      label="立即報名"
      appearance="default"
      className={className}
    />
  )
}

export default SignUp
