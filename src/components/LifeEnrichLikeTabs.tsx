'use client'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { TabsBlock as TabsBlockProps } from '@/payload-types'
import { cn } from '@/utilities'
import { FC, useState } from 'react'

const LifeEnrichLikeTabs: FC<
  TabsBlockProps & {
    id?: string
  }
> = ({ items }) => {
  const [activeTab, setActiveTab] = useState(items?.[0]?.id ?? 0)

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col">
      <div className="hidden md:flex gap-4 mb-6 border-b border-muted-foreground/20 justify-center flex-wrap">
        {items.map((item, idx) => {
          const id = item.id ?? idx
          const isActive = activeTab === id

          return (
            <Button
              key={id}
              variant="ghost"
              onClick={() => setActiveTab(item.id ?? idx)}
              data-active={isActive}
              className={cn('px-8 py-6 transition-colors duration-200 text-xl rounded-none', {
                'text-accent-foreground bg-[#B34C4C] hover:bg-[#B34C4C] hover:text-accent-foreground':
                  isActive,
                'text-accent hover:text-accent-foreground bg-[#FAFBFC] hover:bg-[#B34C4C]':
                  !isActive,
              })}
              size="sm"
            >
              {item.title}
            </Button>
          )
        })}
      </div>
      <div>
        {items.map((item, idx) => {
          const id = item.id ?? idx
          const isActive = activeTab === id

          return (
            <div key={id}>
              <div className="md:hidden mb-4">
                <Button
                  key={id}
                  variant="ghost"
                  onClick={() => setActiveTab(item.id ?? idx)}
                  data-active={isActive}
                  className={cn(
                    'px-8 py-6 transition-colors duration-200 text-xl rounded-none w-full',
                    {
                      'text-accent-foreground bg-[#B34C4C] hover:bg-[#B34C4C] hover:text-accent-foreground':
                        isActive,
                      'text-accent hover:text-accent-foreground bg-[#FAFBFC] hover:bg-[#B34C4C]':
                        !isActive,
                    },
                  )}
                  size="sm"
                >
                  {item.title}
                </Button>
              </div>
              <div
                className={cn('mb-4', {
                  hidden: !isActive,
                  block: isActive,
                })}
              >
                <RichText data={item.content} className="max-w-none" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LifeEnrichLikeTabs
