import Image from 'next/image'
import React from 'react'

export const Logo = () => {
  return (
    <Image
      alt="HPHI Logo"
      className="max-w-[9.375rem]"
      src="/hphi-logo.png"
      width={512}
      height={365}
    />
  )
}
