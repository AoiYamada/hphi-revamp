import type { BannerBlock as BannerBlockProps } from '@/payload-types'

import { cn } from '@/utilities'
import React, { FC } from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

/*
  提示框：不用色塊，上下各一條 line-strong 細線，上方一個黑體小標籤，顏色依樣式區分。
  標籤用字：info「提示」、success「重點」、warning「注意」、error「重要」。
*/
const styleConfig = {
  info: { label: '提示', color: 'text-iris' },
  success: { label: '重點', color: 'text-success-text' },
  warning: { label: '注意', color: 'text-warning-text' },
  error: { label: '重要', color: 'text-error' },
} as const

export const BannerBlock: FC<Props> = ({ className, content, style }) => {
  const { label, color } = styleConfig[style ?? 'info']

  return (
    <div
      role="note"
      className={cn('mx-auto my-6 w-full border-y border-line-strong py-4', className)}
    >
      <div
        className={cn(
          'mb-2 font-sans text-[13px] font-bold leading-normal tracking-[0.2em]',
          color,
        )}
      >
        {label}
      </div>
      <RichText data={content} enableGutter={false} className="max-w-full" />
    </div>
  )
}
