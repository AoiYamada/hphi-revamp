import React from 'react'

import { cn } from '@/utilities'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[96px] w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground transition-[color,border-color,box-shadow] duration-200 ease-out placeholder:text-muted-foreground focus-visible:border-secondary focus-visible:outline-none focus-visible:shadow-lift-focus disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
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
