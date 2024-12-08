'use client'

import React, { FC } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities'

type ClosedProps = {
  className?: string
}

const Closed: FC<ClosedProps> = ({ className }) => {
  return (
    <Button
      className={cn('flex flex-row justify-center text-primary-foreground font-normal', className)}
      disabled
    >
      <span className="px-[14px]">名額已滿</span>
    </Button>
  )
}

export default Closed
