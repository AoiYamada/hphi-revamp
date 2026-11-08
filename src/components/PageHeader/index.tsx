import { cn } from '@/utilities'
import type { FC, ReactNode } from 'react'

type PageHeaderProps = {
  /** Small iris label above the title (English words are set in capitals). */
  kicker: string
  title: string
  /** Listings and the tutor page start at the left; the tutor list and search centre it. */
  align?: 'start' | 'center'
  className?: string
  /** Anything that belongs to the head: a subtitle, the search box. */
  children?: ReactNode
}

/**
 * Head of a listing or detail page that has no layout blocks: kicker, serif title and optional extras.
 * Shared by /posts, /posts/page/[page], /search, /tutors and /tutors/[slug] so they stay in step.
 * The title is plain Tailwind, not `.prose`, so it never picks up the section-title rule.
 */
export const PageHeader: FC<PageHeaderProps> = ({
  kicker,
  title,
  align = 'start',
  className,
  children,
}) => (
  <header
    className={cn(align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl', className)}
  >
    <p className="mb-3 font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-iris">
      {kicker}
    </p>
    <h1 className="font-serif text-[28px] font-bold leading-[1.45] tracking-[0.04em] text-ink md:text-[40px]">
      {title}
    </h1>
    {children}
  </header>
)
