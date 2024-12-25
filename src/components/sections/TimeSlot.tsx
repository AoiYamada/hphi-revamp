import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SignUp from '../SignUp'
import { FC } from 'react'
import KnowMoreCourseInfo from '../KnowMoreCourseInfo'
import Closed from '../Closed'
import Link from 'next/link'
import AnimatedSection from '../AnimatedSection'

type TimeSlotProps = {
  slots: ClassCardProps[]
}

const TimeSlot: FC<TimeSlotProps> = ({ slots }) => {
  return (
    <AnimatedSection className="w-full" id="time-slot">
      <MaxWidthWrapper className="relative flex flex-col items-center justify-center gap-12 text-neutral">
        <div className="max-w-none mx-auto prose md:prose-md dark:prose-invert">
          <h1>開課時間</h1>
        </div>
        <div className="grid grid-flow-row grid-cols-1 gap-16 lg:grid-cols-2 xl:md:grid-cols-3">
          {slots.map((slot, index) => (
            <ClassCard key={index} {...slot} />
          ))}
        </div>
        <div className="w-full text-left">
          <p>
            共 6 課。除 6
            課必修課外，本課程亦設有額外進修時數及網上授課時數，同學可選擇是否參與，彈性完成。共 120
            小時。如同學未能依時完成，本中心亦設一年免費補課及補考服務，時間彈性。
          </p>
          <p>一班最多 8 人，現正招生中，確認會開辦。</p>
          <br />
          <p>* 每個課程均設立助教跟進學員進度。</p>
          <p>
            本中心另設企業培訓或如有其他課程查詢，詳情請按此：{' '}
            <Link
              href="https://wa.me/85293098317"
              className="text-primary underline underline-offset-4"
            >
              +852 9309 8317
            </Link>
          </p>
          <p>
            如想報讀本中心舉辦之 NLP 可持續進修基金課程，
            <Link href="/nlp" className="text-primary underline underline-offset-4">
              請按此
            </Link>
            。
          </p>
        </div>
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
}

const ClassCard: FC<ClassCardProps> = ({ title, time, date, tutors, closed }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-4 rounded-lg border border-neutral/10 bg-basic/50 p-12 shadow-md">
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
      <KnowMoreCourseInfo
        href="https://www.hk-hphi.com/%E7%BE%8E%E5%9C%8B%E8%A8%BB%E5%86%8A%E5%82%AC%E7%9C%A0%E6%B2%BB%E7%99%82%E5%B8%AB%E8%AA%B2%E7%A8%8B-abh-ngh"
        className="mt-8 w-[116px]"
      />
      {closed ? <Closed className="w-[116px]" /> : <SignUp className="w-[116px]" />}
    </div>
  )
}
