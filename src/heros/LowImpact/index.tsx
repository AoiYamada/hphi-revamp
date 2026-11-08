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

/*
  只有文字：置中的明體大標題（設計文件 6.2）。置中是預設值；編輯在後台選的對齊（inline text-align）照樣優先。
  上方留的空白讓 Google 翻譯小工具（掛在 header 下緣右側）不蓋到標題。
*/
export const LowImpactHero: FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className="my-16 md:my-24">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-3xl text-center">
          {children ||
            (richText && <RichText className="hero-copy" data={richText} enableGutter={false} />)}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
