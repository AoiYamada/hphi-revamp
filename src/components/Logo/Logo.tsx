import { cn } from '@/utilities'
import Image from 'next/image'
import React, { FC } from 'react'

type LogoProps = {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Image
      className={cn('max-w-[9.375rem]', className)}
      src="/hphi-logo.png"
      alt="專業心理治療及催眠應用（香港）有限公司（HPHI） Logo"
      width={512}
      height={365}
    />
  )
}
