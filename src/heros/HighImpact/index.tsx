import type { FC } from 'react'
import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

/*
  首頁大圖（設計文件 6.1）。
  桌面（lg 起，1024px）：圖片滿版，左邊漸漸淡成 paper，文字直接放在淡掉的地方（漸層在 styles/hero.css 的
  `.hero-fade`）。文字欄的右緣不超過畫面寬度的一半，確保文字停在漸層還夠濃的範圍內（漸層用百分比，
  畫面越窄、淡掉的範圍越小；在 768px 實測，標題會跑到漸層淡完的地方，對比只有 3.7:1）。
  手機和平板（< 1024px）：圖片在上（手機 4:3、平板 2:1）、往下淡成 paper，文字在圖片下方。
*/
export const HighImpactHero: FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="relative isolate lg:flex lg:min-h-[500px] lg:items-center">
      {media && typeof media === 'object' && (
        <div className="relative aspect-[4/3] md:aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto">
          <Media fill imgClassName="object-cover" priority loading="eager" resource={media} />
          <div aria-hidden="true" className="hero-fade absolute inset-0" />
        </div>
      )}

      <MaxWidthWrapper className="relative w-full py-8 lg:py-24">
        <div className="lg:max-w-[min(34rem,calc(50vw-5rem))]">
          {richText && <RichText className="hero-copy" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
