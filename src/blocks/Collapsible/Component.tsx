import RichText from '@/components/RichText'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/utilities'
import { CollapsibleBlock as CollapsibleBlockProps } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import { FC } from 'react'

/*
  摺疊清單：不用一張張卡片，改成上下細線分隔的清單。標題明體，右邊 chevron，展開後顯示內容。
  清單最上面一條線、每一項下面一條線（用 `divide-y` 加上 `border-y`）。
*/
export const CollapsibleBlock: FC<
  CollapsibleBlockProps & {
    id?: string
  }
> = ({ items }) => {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {(items ?? []).map((item, index) => (
        <Collapsible key={index} className="group">
          <CollapsibleTrigger
            className={cn(
              'flex w-full items-center justify-between gap-4 py-5 text-left',
              'font-serif text-base font-bold leading-snug text-ink md:text-lg',
              'transition-colors duration-200 ease-out-quart hover:text-iris',
              'focus-visible:rounded-xs focus-visible:outline-hidden focus-visible:shadow-focus',
            )}
          >
            <span>{item.title}</span>
            <ChevronRight
              className={cn(
                'size-4 shrink-0 text-ink-faint',
                'transition-transform duration-200 ease-out-quart',
                'group-data-[state=open]:rotate-90',
              )}
              aria-hidden
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="collapsible-content">
            <div className="max-w-[65ch] pb-6 pr-8">
              <RichText data={item.content} className="max-w-none" />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
