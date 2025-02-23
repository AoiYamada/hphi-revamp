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
    <div className="prose max-w-full">
      <blockquote
        className={cn(
          'relative w-full text-primary before:absolute before:-left-3 before:-top-8 before:font-serif before:text-7xl before:italic before:text-primary/30 before:content-[open-quote] after:absolute after:-right-3 after:-top-8 after:font-serif after:text-7xl after:italic after:text-primary/30 after:content-[close-quote]',
          'border-primary/30',
          className,
        )}
      >
        <div className="mb-4">
          {quote.split('\n').map((line, index) => (
            <p
              key={index}
              className="text-justify text-2xl font-bold leading-relaxed lg:text-4xl lg:leading-relaxed my-0 before:content-[''] after:content-['']"
            >
              {line}
            </p>
          ))}
        </div>
        <footer className="text-right text-xl font-bold text-primary">— {author}</footer>
      </blockquote>
    </div>
  )
}
