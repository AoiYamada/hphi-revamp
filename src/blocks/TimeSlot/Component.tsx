import TimeSlot from '@/components/sections/TimeSlot'
import { TimeSlotBlock as TimeSlotBlockProps } from '@/payload-types'
import { FC } from 'react'

export const TimeSlotBlock: FC<
  TimeSlotBlockProps & {
    id?: string
  }
> = ({ introContent, outroContent, registrationForm, timeSlots }) => {
  return (
    <div className="w-full">
      <TimeSlot
        timeSlots={timeSlots ?? []}
        registrationForm={registrationForm}
        introContent={introContent}
        outroContent={outroContent}
      />
    </div>
  )
}
