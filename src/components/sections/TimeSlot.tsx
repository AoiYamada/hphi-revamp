import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SignUp from '../SignUp'
import { FC } from 'react'
import Closed from '../Closed'
import AnimatedSection from '../AnimatedSection'
import { TimeSlotBlock as TimeSlotBlockProps } from '@/payload-types'
import RichText from '../RichText'

const TimeSlot: FC<Omit<TimeSlotBlockProps, 'id' | 'blockName' | 'blockType'>> = ({
  introContent,
  outroContent,
  timeSlots,
  registrationForm,
}) => {
  const formId = typeof registrationForm === 'string' ? registrationForm : registrationForm?.id

  return (
    <AnimatedSection className="w-full" id="time-slot">
      <MaxWidthWrapper className="relative flex flex-col items-center justify-center gap-12 text-neutral">
        {introContent && <RichText data={introContent} className="w-full" />}
        <div className="grid grid-flow-row grid-cols-1 gap-16 lg:grid-cols-2 xl:md:grid-cols-3">
          {(timeSlots ?? []).map((slot, index) => (
            <ClassCard key={index} {...slot} formId={formId} />
          ))}
        </div>
        {outroContent && <RichText data={outroContent} className="w-full" />}
      </MaxWidthWrapper>
    </AnimatedSection>
  )
}

export default TimeSlot

type ClassCardProps = {
  title: string
  time: string
  date: string
  tutors?: string
  closed: boolean
  formId?: string
}

const ClassCard: FC<ClassCardProps> = ({ title, time, date, tutors, closed, formId }) => {
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
        {tutors && tutors.length > 0 && (
          <div className="mt-4 flex flex-col">
            <div className="shrink-0">任教導師：</div>
            <div>
              {tutors.split('\n').map((tutor, idx) => (
                <span key={idx}>{tutor}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      {closed ? (
        <Closed className="w-[116px]" />
      ) : (
        <SignUp className="w-[116px]" url={formId ? `#anchor-${formId}` : undefined} />
      )}
    </div>
  )
}
