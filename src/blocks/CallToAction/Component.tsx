import React, { FC } from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { cn } from '@/utilities'

type CTAVariant = 'band' | 'contained'

type Props = CTABlockProps & {
  /**
   * `band`（預設）：頁面 layout 裡滿版的 anchor 色帶。
   * `contained`：限制在所在的欄位裡（文章內文欄、Content 區塊的欄位），4px 圓角，不滿版。
   * 放在富文字裡的 CTA 一律是 `contained`（見 RichText 的轉換器）。
   */
  variant?: CTAVariant
}

/** CMS 的連結樣式只有 `default` 和 `outline`；在深色底上對應到紙色底和紙色外框的按鈕。 */
const DARK_BACKGROUND_APPEARANCE = {
  default: 'paper',
  outline: 'paperOutline',
} as const

/*
  滿版的做法：色帶先用負邊距拉到視窗的左右邊緣。
  - 寬度用 `100cqw`：頁面的 <article> 是 `@container`（[slug] 和 courses/[slug] 的 page.tsx），
    `cqw` 是它的內容寬度，不含捲軸，所以不會橫向捲動。不用 `w-screen`（`100vw` 含捲軸，
    在有捲軸的系統上會多出一條橫向捲軸）。
  - `cqw` 的支援度（Chrome 105、Safari 16、Firefox 110）比 Tailwind v4 的最低需求低，不需要備案。
  - 色帶放在置中的容器裡，所以 `50% - 50cqw` 剛好把它拉到左邊緣。
*/
const BAND_BREAKOUT = 'ml-[calc(50%-50cqw)] w-[100cqw] max-w-none'

export const CallToActionBlock: FC<Props> = ({ links, richText, variant = 'band' }) => {
  const isBand = variant === 'band'
  const hasLinks = Array.isArray(links) && links.length > 0

  const content = (
    <div
      className={cn(
        'flex flex-col gap-6',
        isBand && 'md:flex-row md:items-center md:justify-between md:gap-10',
      )}
    >
      {richText && (
        <div className="cta-text min-w-0 md:flex-1">
          <RichText data={richText} enableGutter={false} enableProse={false} />
        </div>
      )}

      {hasLinks && (
        <div className="flex flex-row flex-wrap gap-3 md:shrink-0 md:flex-nowrap">
          {links.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance={DARK_BACKGROUND_APPEARANCE[link.appearance ?? 'default']}
            />
          ))}
        </div>
      )}
    </div>
  )

  if (!isBand) {
    return (
      <section
        data-variant="contained"
        className="not-prose my-10 rounded-sm bg-anchor px-6 py-9 md:px-10 md:py-10"
      >
        {content}
      </section>
    )
  }

  return (
    <section data-variant="band" className={cn('not-prose my-12 bg-anchor', BAND_BREAKOUT)}>
      <MaxWidthWrapper className="py-12 md:py-16">{content}</MaxWidthWrapper>
    </section>
  )
}
