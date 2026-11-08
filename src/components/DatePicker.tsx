'use client'

import { format } from 'date-fns'
import React, { FC, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities'
import { CalendarIcon } from 'lucide-react'

type DatePickerProps = {
  defaultDate?: Date
  invalid?: boolean
  onSelect?: (date: Date) => void
}

const DatePicker: FC<DatePickerProps> = ({ defaultDate, invalid, onSelect }) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate)

  const handleSelect = (date: Date) => {
    setDate(date)
    onSelect?.(date)
  }

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          {/* 外觀和輸入框一致（見 ui/input.tsx）：line 邊框、paper-raised 底。 */}
          <Button
            variant="outline"
            aria-invalid={invalid}
            className={cn(
              'w-60 justify-start border-input bg-card px-3.5 text-left font-normal tracking-normal text-foreground hover:bg-card focus-visible:border-ring aria-invalid:border-error',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'MM/dd/yyyy') : <span>請選擇日期</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={handleSelect} autoFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker
