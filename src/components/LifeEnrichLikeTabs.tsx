'use client'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { TabsBlock as TabsBlockProps } from '@/payload-types'
import { cn } from '@/utilities'
import { FC, useState } from 'react'
import { useRef, useEffect } from 'react'

const LifeEnrichLikeTabs: FC<
  TabsBlockProps & {
    id?: string
  }
> = ({ items }) => {
  const [activeTab, setActiveTab] = useState(items?.[0]?.id ?? 0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const activeIdx = items?.findIndex((item, idx) => (item.id ?? idx) === activeTab)
    if (typeof activeIdx === 'number' && activeIdx >= 0 && tabRefs.current[activeIdx]) {
      tabRefs.current[activeIdx]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }
  }, [activeTab, items])

  if (!items || items.length === 0) {
    return null
  }

  const setRef = (idx: number) => (el: HTMLButtonElement | null) => {
    if (el) {
      tabRefs.current[idx] = el
    } else {
      tabRefs.current[idx] = null
    }
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
              ref={setRef(idx)}
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
                  ref={setRef(idx)}
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
