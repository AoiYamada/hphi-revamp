import SignUp from '../SignUp'
import { FC } from 'react'
import Closed from '../Closed'
import AnimatedSection from '../AnimatedSection'
import { TimeSlotBlock as TimeSlotBlockProps } from '@/payload-types'
import RichText from '../RichText'
import { cn } from '@/utilities'
import { Calendar, Clock, GraduationCap } from 'lucide-react'

const TimeSlot: FC<
  Omit<TimeSlotBlockProps, 'blockName' | 'blockType'> & {
    className?: string
  }
> = ({ introContent, outroContent, timeSlots, registrationForm, notes, className }) => {
  const formId = typeof registrationForm === 'string' ? registrationForm : registrationForm?.id

  return (
    <AnimatedSection id={`timeslot-for-${formId}`} className={cn('w-full', className)}>
      <div className="flex flex-col items-center justify-center gap-12 py-8">
        {introContent && <RichText data={introContent} className="w-full max-w-full" />}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
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
    <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-7 text-card-foreground shadow-lift-1 transition-shadow duration-300 ease-out hover:shadow-lift-2">
      <h2 className="text-xl font-semibold leading-snug text-secondary md:text-2xl">{title}</h2>

      <div className="flex flex-col gap-3 text-sm">
        <DetailRow icon={<Clock className="size-4" />} label="時間">
          {time.split('\n').map((chunk, idx) => (
            <span key={idx} className="block">
              {chunk}
            </span>
          ))}
        </DetailRow>

        <DetailRow icon={<Calendar className="size-4" />} label="日期">
          {date.split('\n').map((chunk, idx) => (
            <span key={idx} className="block">
              {chunk}
            </span>
          ))}
        </DetailRow>

        <DetailRow icon={<GraduationCap className="size-4" />} label="任教導師">
          <RichText data={tutors} className="w-full max-w-none" enableProse={false} />
        </DetailRow>
      </div>

      <div className="mt-2">
        {closed ? (
          <Closed className="w-full sm:w-auto" />
        ) : (
          <SignUp className="w-full sm:w-auto" url={formId ? `#anchor-${formId}` : undefined} />
        )}
      </div>

      {notes && (
        <div className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          {notes.split('\n').map((chunk, idx) => (
            <span key={idx} className="block">
              {chunk}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const DetailRow: FC<{
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}> = ({ icon, label, children }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-secondary">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-foreground">{children}</div>
    </div>
  </div>
)
