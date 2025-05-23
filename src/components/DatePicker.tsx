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
  onSelect?: (date: Date) => void
}

const DatePicker: FC<DatePickerProps> = ({ defaultDate, onSelect }) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate)

  const handleSelect = (date: Date) => {
    setDate(date)
    onSelect?.(date)
  }

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !date && 'text-foreground',
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
