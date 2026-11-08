import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-0.5 font-sans text-xs font-medium uppercase tracking-wider transition-colors focus-visible:outline-hidden focus-visible:shadow-focus',
  {
    variants: {
      variant: {
        // 標籤本身不能點，所以沒有 hover 樣式。
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-iris',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'border-border text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
