import type { FC, ReactNode } from 'react'
import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Bloom } from '@/components/Decoration'

type LowImpactHeroType =
  | {
      children?: ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className="relative isolate my-16 md:my-24">
      <Bloom position="top-right" intensity="subtle" size={55} />

      <MaxWidthWrapper>
        <div className="max-w-3xl">
          {children ||
            (richText && (
              <div className="prose md:prose-lg max-w-none">
                <RichText data={richText} enableGutter={false} />
              </div>
            ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
