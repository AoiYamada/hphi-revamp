import RichText from '@/components/RichText'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { CollapsibleBlock as CollapsibleBlockProps } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import { FC } from 'react'

export const CollapsibleBlock: FC<
  CollapsibleBlockProps & {
    id?: string
  }
> = ({ items }) => {
  return (items ?? []).map((item, index) => (
    <Collapsible key={index}>
      <CollapsibleTrigger className="group w-full max-w-none mx-auto prose md:prose-md dark:prose-invert">
        <h3 className="flex flex-row items-center">
          {item.title}{' '}
          <ChevronRight
            className={cn('ml-1 h-4 w-4 transition-all group-data-[state=open]:rotate-90')}
          />
        </h3>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsible-content">
        <RichText data={item.content} className="max-w-none" />
      </CollapsibleContent>
    </Collapsible>
  ))
}
