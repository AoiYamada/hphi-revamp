import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities'
import React, { FC } from 'react'
import { Info, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

const styleConfig = {
  info: {
    container: 'bg-muted/60 text-foreground',
    icon: 'text-secondary',
    Icon: Info,
  },
  success: {
    container: 'bg-success/15 text-foreground',
    icon: 'text-success',
    Icon: CheckCircle2,
  },
  warning: {
    container: 'bg-warning/15 text-foreground',
    icon: 'text-warning',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-error/15 text-foreground',
    icon: 'text-error',
    Icon: AlertCircle,
  },
} as const

export const BannerBlock: FC<Props> = ({ className, content, style }) => {
  const config = styleConfig[style ?? 'info']
  const { Icon } = config

  return (
    <div className={cn('mx-auto my-6 w-full', className)}>
      <div className={cn('flex items-start gap-3 rounded-lg px-5 py-4', config.container)}>
        <Icon className={cn('mt-0.5 size-5 shrink-0', config.icon)} aria-hidden />
        <div className="prose md:prose-md max-w-full flex-1 [&>p]:m-0">
          <RichText data={content} enableGutter={false} enableProse={false} />
        </div>
      </div>
    </div>
  )
}
