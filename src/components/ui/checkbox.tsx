'use client'

import React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/utilities'

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // 未勾選用 ink-faint 邊框（line 色太淡，看不清楚框在哪裡）；勾選後整格變 iris。
      'peer size-5 shrink-0 rounded-xs border border-ink-faint bg-card transition-colors duration-200 ease-out focus-visible:border-ring focus-visible:shadow-focus focus-visible:outline-hidden aria-invalid:border-error disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-iris data-[state=checked]:bg-iris data-[state=checked]:text-paper',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
