import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 ease-out-quart focus-visible:outline-none focus-visible:shadow-lift-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // No box-shadow on any variant. Hover surfaces are Soft Bloom (--muted),
        // never Soft Violet (--accent). See DESIGN.md "No-Lavender-Backgrounds".
        default: 'bg-primary text-primary-foreground hover:bg-secondary',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border bg-background text-primary hover:bg-muted hover:border-secondary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/85',
        ghost: 'text-primary hover:bg-muted',
        link: 'items-start justify-start text-secondary underline-offset-4 hover:underline',
      },
      size: {
        clear: '',
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-3.5 text-xs',
        lg: 'h-[52px] px-8 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
