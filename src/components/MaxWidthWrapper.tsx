import { cn } from '@/utilities'
import type { FC, ReactNode } from 'react'

type MaxWidthWrapperProps = {
  id?: string
  className?: string
  children: ReactNode
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ id, className, children }) => {
  return (
    <div id={id} className={cn('container px-5 py-8 md:px-20', className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
