import React from 'react'

import { cn } from '@/utilities'

// 樣式和 Input 一致（見 input.tsx），只是高度由 `min-h-24` 和 `rows` 決定。
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-24 w-full rounded-sm border border-input bg-card px-3.5 py-2.5 text-base text-foreground transition-[color,border-color,box-shadow] duration-200 ease-out placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-focus focus-visible:outline-hidden aria-invalid:border-error aria-invalid:focus-visible:border-error disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
