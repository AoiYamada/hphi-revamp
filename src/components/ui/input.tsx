import React from 'react'

import { cn } from '@/utilities'

/*
  輸入類元件（Input、Textarea、Select 觸發鈕）共用同一組樣式：
  44px 高、4px 圓角、1px line 邊框、paper-raised 底；focus 是 iris 邊框加外圈；
  錯誤（`aria-invalid`）是 error 色邊框，而且 focus 時也維持，才看得出哪一欄有問題。
*/
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-sm border border-input bg-card px-3.5 py-2 text-base text-foreground transition-[color,border-color,box-shadow] duration-200 ease-out file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-focus focus-visible:outline-hidden aria-invalid:border-error aria-invalid:focus-visible:border-error disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
