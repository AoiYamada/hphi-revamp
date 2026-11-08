import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities'
import Link from 'next/link'
import { FC } from 'react'

import type { Course, Page, Post, Tutor } from '@/payload-types'

/*
  `appearance` 對應 button 的 variant：CMS 欄位（`src/fields/link.ts`）只有 `default` 和 `outline`，
  各自對應同名的 variant；其他 variant（`paper`、`paperOutline` 等）給程式碼直接指定。
  `inline` 不套用任何按鈕樣式（富文字裡的連結）。

  `link` 只有選單和 footer 在用，它是「純文字連結」：顏色由呼叫端的 className 決定，只在 hover 時
  才有底線，字距也不加寬，保留原版的外觀（規格 4.3）。所以這裡把 `link` variant 的恆常底線和
  字距蓋掉，其他地方要用文字按鈕請直接用 `<Button variant="link">`。
*/
const NAV_LINK_CLASS =
  'items-start justify-start text-iris-soft no-underline tracking-normal hover:underline'

export type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  reference?: {
    relationTo: 'pages' | 'posts' | 'courses' | 'tutors'
    value: Page | Post | Course | Tutor | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    onClick,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const isNavLink = appearance === 'link'
  const size = isNavLink ? 'clear' : sizeFromProps
  const linkClassName = isNavLink ? cn(NAV_LINK_CLASS, className) : className
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} onClick={onClick} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={linkClassName} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} onClick={onClick} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
