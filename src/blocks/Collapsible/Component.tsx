import RichText from '@/components/RichText'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/utilities'
import { CollapsibleBlock as CollapsibleBlockProps } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import { FC } from 'react'

export const CollapsibleBlock: FC<
  CollapsibleBlockProps & {
    id?: string
  }
> = ({ items }) => {
  return (
    <div className="flex flex-col gap-3">
      {(items ?? []).map((item, index) => (
        <Collapsible
          key={index}
          className="group rounded-lg border border-border bg-card text-card-foreground"
        >
          <CollapsibleTrigger
            className={cn(
              'flex w-full items-center justify-between gap-4 rounded-lg px-6 py-5 text-left',
              'text-base font-semibold text-foreground md:text-lg',
              'transition-colors duration-200 ease-out-quart hover:bg-muted/60',
              'focus-visible:outline-none focus-visible:shadow-lift-focus',
            )}
          >
            <span>{item.title}</span>
            <ChevronRight
              className={cn(
                'size-4 shrink-0 text-muted-foreground',
                'transition-transform duration-200 ease-out-quart',
                'group-data-[state=open]:rotate-90',
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="collapsible-content">
            <div className="max-w-[65ch] px-6 pb-6">
              <RichText data={item.content} className="max-w-none" />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
