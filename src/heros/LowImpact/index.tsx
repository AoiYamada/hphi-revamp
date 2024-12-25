import type { FC, ReactNode } from 'react'
import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

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
    <MaxWidthWrapper className="mt-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </MaxWidthWrapper>
  )
}
