import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Radio: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, options, required, width, defaultValue }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <RadioGroup onValueChange={(val) => onChange(val)} value={value} className="space-y-2">
              {options.map(({ label, value }) => {
                const id = `${name}-${value}`

                return (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={id} />
                    <Label htmlFor={id}>{label}</Label>
                  </div>
                )
              })}
            </RadioGroup>
          )
        }}
        rules={{ required }}
      />
      {required && errors[name] && <Error />}
    </Width>
  )
}
