import { WhatsApp } from '@/components/icons/WhatsApp'
import { Button } from '@/components/ui/button'
import React, { FC } from 'react'

import { formatPrice } from './orderRequest'

type Props = {
  count: number
  total: number
  href: string
  onOrder: () => void
}

// Sticks to the bottom of the viewport only while its Book List is on screen. On narrow
// screens the right padding leaves room for the site-wide floating WhatsApp button.
export const OrderBar: FC<Props> = ({ count, total, href, onOrder }) => (
  <div className="sticky bottom-3 flex items-center justify-between gap-4 rounded-lg border border-border bg-background py-3 pl-4 pr-20 shadow-lift-2 md:pr-3">
    {/* Two short lines on mobile, where the button and floating WhatsApp button leave ~60px. */}
    <p className="flex flex-col text-sm text-muted-foreground md:flex-row">
      <span className="whitespace-nowrap">
        已選 <span className="font-semibold tabular-nums text-foreground">{count}</span> 本
      </span>
      <span className="whitespace-nowrap">
        <span className="hidden md:inline">・合共 </span>
        <span className="font-semibold tabular-nums text-foreground">{formatPrice(total)}</span>
      </span>
    </p>
    <Button asChild>
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onOrder}>
        <span aria-hidden className="contents">
          <WhatsApp />
        </span>
        WhatsApp 訂購
      </a>
    </Button>
  </div>
)
