import { QuoteBlock as QuoteBlockProps } from '@/payload-types'
import { cn } from '@/utilities'
import { FC } from 'react'

export const QuoteBlock: FC<
  QuoteBlockProps & {
    id?: string
    className?: string
  }
> = ({ quote, author, className }) => {
  return (
    <figure className={cn('my-12 w-full', className)}>
      <blockquote className="relative rounded-xl bg-muted/60 px-8 py-10 md:px-14 md:py-14">
        {/* Restrained opening quote — Soft Violet, decorative not loud */}
        <span
          aria-hidden
          className="absolute left-6 top-4 select-none font-serif text-6xl leading-none text-accent/50 md:left-10 md:top-6 md:text-7xl"
        >
          &ldquo;
        </span>

        <div className="relative space-y-3">
          {quote.split('\n').map((line, index) => (
            <p
              key={index}
              className="text-xl font-light leading-relaxed text-foreground md:text-2xl md:leading-relaxed lg:text-3xl"
            >
              {line}
            </p>
          ))}
        </div>

        {author && (
          <figcaption className="mt-6 flex items-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="h-px w-6 bg-secondary" aria-hidden />
            {author}
          </figcaption>
        )}
      </blockquote>
    </figure>
  )
}
