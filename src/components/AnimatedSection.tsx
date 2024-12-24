'use client'

import { useRef } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/utilities'

type AnimatedSectionProps = PropsWithChildren & {
  className?: string
  id?: string
}

const AnimatedSection: FC<AnimatedSectionProps> = ({ children, className, id }) => {
  const ref = useRef(null)
  const isInView = useInView(ref as any, { once: true })

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'duration-500 ease-in',
        {
          '-translate-y-12 opacity-0': !isInView,
          'opacity-100': isInView,
        },
        className,
      )}
    >
      {children}
    </section>
  )
}

export default AnimatedSection
