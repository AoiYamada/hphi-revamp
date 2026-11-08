import type { FC } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

/*
  左文右圖，各佔一半（設計文件 6.2）；手機上文字在上、圖片在下。
  圖片 4px 圓角，沒有邊框和陰影。上方留的空白讓 Google 翻譯小工具（掛在 header 下緣右側）不蓋到標題。
*/
export const MediumImpactHero: FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="mt-16 mb-12 md:my-20">
      <MaxWidthWrapper>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
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

          {media && typeof media === 'object' && (
            <div>
              <Media
                imgClassName="h-auto w-full rounded-sm object-cover"
                priority={false}
                loading="lazy"
                resource={media}
              />
              {media.caption && (
                // 圖說：黑體 13px、muted、置中，和 MediaBlock 一樣；編輯設定的對齊（inline text-align）仍然優先。
                <div className="mt-3 text-center font-sans text-[13px] leading-relaxed text-ink-faint">
                  <RichText data={media.caption} enableGutter={false} enableProse={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
