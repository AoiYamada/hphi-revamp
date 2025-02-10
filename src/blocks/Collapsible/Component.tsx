import RichText from '@/components/RichText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  return (
    <div className="space-y-4">
      {(items ?? []).map((item, index) => (
        <Card key={index}>
          <Collapsible>
            <CollapsibleTrigger className="group w-full max-w-none mx-auto prose md:prose-md dark:prose-invert">
              <CardHeader>
                <CardTitle className="flex flex-row items-center">
                  {item.title}
                  <ChevronRight
                    className={cn('ml-1 h-4 w-4 transition-all group-data-[state=open]:rotate-90')}
                  />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent className="collapsible-content">
              <CardContent>
                <RichText data={item.content} className="max-w-none" />
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}
