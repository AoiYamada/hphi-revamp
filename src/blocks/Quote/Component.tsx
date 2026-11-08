import { QuoteBlock as QuoteBlockProps } from '@/payload-types'
import { cn } from '@/utilities'
import { FC } from 'react'

/*
  引言：置中、明體 600、約 25px、anchor 色，整段前後加「」，作者用黑體小字。
  放在富文字裡時要加 `not-prose`，blockquote 和 p 才不會吃到頁面長文的規則。
  「」用 CSS 的 ::before／::after 加在第一行和最後一行，複製文字時不會帶進去。
*/
export const QuoteBlock: FC<
  QuoteBlockProps & {
    id?: string
    className?: string
  }
> = ({ quote, author, className }) => {
  return (
    <figure className={cn('not-prose my-12 w-full text-center', className)}>
      <blockquote className="mx-auto max-w-[34em] font-serif text-[22px] font-semibold leading-[1.8] text-anchor md:text-[25px]">
        {quote.split('\n').map((line, index) => (
          <p key={index} className="first:before:content-['「'] last:after:content-['」']">
            {line}
          </p>
        ))}
      </blockquote>

      {author && (
        <figcaption className="mt-5 font-sans text-[13px] leading-normal tracking-[0.2em] text-ink-faint">
          {author}
        </figcaption>
      )}
    </figure>
  )
}
