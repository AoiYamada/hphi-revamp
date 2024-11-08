import { cn } from '@/utilities'
import Image from 'next/image'
import React, { FC } from 'react'

type LogoProps = {
  className?: string
  noText?: boolean
}

const Logo: FC<LogoProps> = ({ className, noText = true }) => {
  return (
    <div className="flex cursor-pointer flex-row items-center justify-between gap-4">
      <Image
        className={cn('max-w-[9.375rem]', className)}
        src="/hphi-logo.png"
        alt="專業心理治療及催眠應用（香港）有限公司（HPHI） Logo"
        width={45 * 1.7}
        height={32 * 1.7}
      />
      <div
        className={cn('hidden lg:flex flex-col', {
          'lg:hidden': noText,
        })}
      >
        <span className="text-nowrap">專業心理治療及催眠應用</span>
        <span className="text-nowrap text-sm">HPHI EDUCATION LIMITED</span>
      </div>
    </div>
  )
}

export default Logo
