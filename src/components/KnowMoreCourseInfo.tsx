'use client'

import React, { FC } from 'react'
import { CMSLink } from './Link'

type KnowMoreCourseInfoProps = {
  href: string
  className?: string
}

const KnowMoreCourseInfo: FC<KnowMoreCourseInfoProps> = ({ href, className }) => {
  return (
    <CMSLink
      type="custom"
      newTab={false}
      url={href}
      label="了解更多"
      appearance="outline"
      className={className}
    />
  )
}

export default KnowMoreCourseInfo
