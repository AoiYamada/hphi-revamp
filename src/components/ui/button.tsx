import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities'

/*
  按鈕：4px 圓角（`icon` 例外，是圓形）、黑體 500、字距 0.05em（`tracking-wider`）。
  平時沒有陰影，只有 focus 才有外圈；深色底上的按鈕改用 `shadow-focus-inverse`（淺色外圈）。
  CMSLink 的 `appearance`（`default`、`outline`）對應到同名的 variant，見 `@/components/Link`。
*/
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-sans text-sm font-medium tracking-wider transition-colors duration-200 ease-out-quart focus-visible:outline-hidden focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // 主要按鈕：深紫底、紙色字。
        default: 'bg-primary text-primary-foreground hover:bg-anchor/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // 次要按鈕：墨色外框。
        outline: 'border border-ink text-ink hover:bg-paper-sunken',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/85',
        ghost: 'hover:bg-paper-sunken',
        // 文字按鈕。
        link: 'underline underline-offset-4 decoration-iris',
        // 給深色底（CTA 色帶等）用：紙色底，和紙色外框。
        paper: 'bg-paper text-anchor hover:bg-paper-sunken focus-visible:shadow-focus-inverse',
        paperOutline:
          'border border-paper/70 text-paper hover:bg-paper/10 focus-visible:shadow-focus-inverse',
      },
      size: {
        // 不套任何尺寸：給純文字連結（選單、footer）用。
        clear: '',
        sm: 'h-9 px-4',
        default: 'h-11 px-6',
        lg: 'h-13 px-8 text-base',
        icon: 'size-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
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
