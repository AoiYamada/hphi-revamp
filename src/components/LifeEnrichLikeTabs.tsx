'use client'

import RichText from '@/components/RichText'
import { TabsBlock as TabsBlockProps } from '@/payload-types'
import { cn } from '@/utilities'
import { FC, useState } from 'react'
import { useRef, useEffect } from 'react'
import Link from 'next/link'

type TabItem = NonNullable<TabsBlockProps['items']>[number]

const getLinkUrl = (linkData: unknown): string | null => {
  const link = linkData as
    | {
        type?: 'reference' | 'custom' | null
        reference?: { relationTo: string; value: { slug: string } | string } | null
        url?: string | null
      }
    | undefined
  if (!link) return null
  if (link.type === 'reference' && link.reference) {
    const value = link.reference.value
    const slug = typeof value === 'string' ? value : (value as { slug: string })?.slug
    return slug ? `/${slug}` : null
  }
  if (link.type === 'custom' && link.url) {
    return link.url
  }
  return null
}

/* 分頁標籤：黑體；選中的是 ink 色加 2px iris 底線，沒選中的是 muted，hover 時變 ink。 */
const tabBaseClass =
  'relative inline-flex items-center justify-center whitespace-nowrap px-6 py-4 font-sans text-base font-medium leading-normal transition-colors duration-200 ease-out-quart focus-visible:outline-hidden focus-visible:shadow-focus md:text-lg'

const tabActiveClass =
  'text-ink after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:bg-iris'

const tabInactiveClass = 'text-ink-faint hover:text-ink'

/* 手機版：一排排整行的按鈕，選中的是 anchor 底。 */
const mobileTabClass =
  'flex w-full items-center justify-center rounded-sm border px-6 py-4 font-sans text-base font-medium leading-normal transition-colors duration-200 ease-out-quart'

const mobileTabActiveClass = 'border-anchor bg-anchor text-paper'

const mobileTabInactiveClass = 'border-line bg-paper-raised text-ink hover:bg-paper-sunken'

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
    tabRefs.current[idx] = el
  }

  const handleTabClick = (idx: number) => {
    const item = items[idx]
    const linkUrl = getLinkUrl(item.directLink?.link)
    if (linkUrl) return
    setActiveTab(item.id ?? idx)
  }

  return (
    <div className="flex flex-col">
      {/* Desktop tab bar */}
      <div className="mb-8 hidden flex-wrap justify-center border-b border-border md:flex">
        {items.map((item, idx) => {
          const id = item.id ?? idx
          const isActive = activeTab === id
          const linkUrl = getLinkUrl(item.directLink?.link)

          if (linkUrl) {
            return (
              <Link
                key={id}
                href={linkUrl}
                className={cn(tabBaseClass, isActive ? tabActiveClass : tabInactiveClass)}
              >
                {item.title}
              </Link>
            )
          }

          return (
            <button
              key={id}
              ref={setRef(idx)}
              type="button"
              onClick={() => handleTabClick(idx)}
              data-active={isActive}
              className={cn(tabBaseClass, isActive ? tabActiveClass : tabInactiveClass)}
            >
              {item.title}
            </button>
          )
        })}
      </div>

      {/* Mobile: stacked, full-width tab pills + content per item */}
      <div>
        {items.map((item, idx) => {
          const id = item.id ?? idx
          const isActive = activeTab === id
          const linkUrl = getLinkUrl(item.directLink?.link)

          if (linkUrl) {
            return (
              <div key={id} className="mb-3 md:hidden">
                <Link
                  href={linkUrl}
                  className={cn(
                    mobileTabClass,
                    isActive ? mobileTabActiveClass : mobileTabInactiveClass,
                  )}
                >
                  {item.title}
                </Link>
              </div>
            )
          }

          return (
            <div key={id}>
              <div className="mb-3 md:hidden">
                <button
                  ref={setRef(idx)}
                  type="button"
                  onClick={() => handleTabClick(idx)}
                  data-active={isActive}
                  className={cn(
                    mobileTabClass,
                    'focus-visible:outline-hidden focus-visible:shadow-focus',
                    isActive ? mobileTabActiveClass : mobileTabInactiveClass,
                  )}
                >
                  {item.title}
                </button>
              </div>
              <div className={cn('mb-4', isActive ? 'block' : 'hidden')}>
                {item.content && <RichText data={item.content} className="max-w-none" />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LifeEnrichLikeTabs
