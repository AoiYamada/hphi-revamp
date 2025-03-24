import type { Control, FieldErrorsImpl } from 'react-hook-form'

import DatePicker from '@/components/DatePicker'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'
import { DateField } from '../custom-fields'

export const Date: React.FC<
  DateField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, required, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          return <DatePicker defaultDate={value} onSelect={(date) => onChange(date)} />
        }}
        rules={{ required }}
      />
      {required && errors[name] && <Error />}
    </Width>
  )
}
