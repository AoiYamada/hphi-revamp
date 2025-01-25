import AnimatedSection from '@/components/AnimatedSection'
import RichText from '@/components/RichText'
import {
  Timeline,
  TimelineItem,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineHeader,
} from '@/components/ui/timeline'
import { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { FC } from 'react'

export const TimelineBlock: FC<
  TimelineBlockProps & {
    id?: string
  }
> = ({ introContent, outroContent, timelines }) => {
  return (
    <AnimatedSection className="w-full">
      <div className="flex flex-col items-center justify-center gap-12 py-8">
        {introContent && <RichText data={introContent} className="w-full max-w-full" />}
        <Timeline>
          {(timelines ?? []).map((item) => (
            <TimelineItem key={item.id}>
              <TimelineHeader>
                <TimelineTime>{item.time}</TimelineTime>
                <TimelineTitle>{item.title}</TimelineTitle>
              </TimelineHeader>
              <TimelineDescription className="text-secondary">
                <RichText data={item.description} className="w-full max-w-full" />
              </TimelineDescription>
            </TimelineItem>
          ))}
        </Timeline>
        {outroContent && <RichText data={outroContent} className="w-full max-w-full" />}
      </div>
    </AnimatedSection>
  )
}
