import SignUp from '../SignUp'
import { FC } from 'react'
import Closed from '../Closed'
import AnimatedSection from '../AnimatedSection'
import { TimeSlotBlock as TimeSlotBlockProps } from '@/payload-types'
import RichText from '../RichText'
import { cn } from '@/utilities'

const TimeSlot: FC<
  Omit<TimeSlotBlockProps, 'id' | 'blockName' | 'blockType'> & {
    className?: string
  }
> = ({ introContent, outroContent, timeSlots, registrationForm, notes, className }) => {
  const formId = typeof registrationForm === 'string' ? registrationForm : registrationForm?.id

  return (
    <AnimatedSection className={cn('w-full', className)}>
      <div className="flex flex-col items-center justify-center gap-12 py-8">
        {introContent && <RichText data={introContent} className="w-full max-w-full" />}
        <div className="grid grid-flow-row grid-cols-1 gap-16 lg:grid-cols-2 xl:md:grid-cols-3">
          {(timeSlots ?? []).map((slot, index) => (
            <ClassCard key={index} {...slot} formId={formId} notes={notes} />
          ))}
        </div>
        {outroContent && <RichText data={outroContent} className="w-full max-w-full" />}
      </div>
    </AnimatedSection>
  )
}

export default TimeSlot

type ClassCardProps = {
  title: string
  time: string
  date: string
  notes?: string | null
  tutors: NonNullable<TimeSlotBlockProps['timeSlots']>[number]['tutors']
  closed: boolean
  formId?: string
}

const ClassCard: FC<ClassCardProps> = ({ title, time, date, notes, tutors, closed, formId }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-4 rounded-lg border border-neutral/10 bg-basic/50 p-12 shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="shrink-0">時間：</div>
          <div className="flex flex-col">
            {time.split('\n').map((chunk, idx) => (
              <span key={idx}>{chunk}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="shrink-0">日期：</div>
          <div className="flex flex-col">
            {date.split('\n').map((chunk, idx) => (
              <span key={idx}>{chunk}</span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="shrink-0">任教導師：</div>
          <div>
            <RichText data={tutors} className="w-full" />
          </div>
        </div>
      </div>
      {closed ? (
        <Closed className="w-[116px]" />
      ) : (
        <SignUp className="w-[116px]" url={formId ? `#anchor-${formId}` : undefined} />
      )}
      {notes && (
        <div className="flex flex-col w-full mt-4">
          {notes.split('\n').map((chunk, idx) => (
            <span key={idx}>{chunk}</span>
          ))}
        </div>
      )}
    </div>
  )
}
