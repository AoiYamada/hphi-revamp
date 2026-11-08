import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function NotFound() {
  return (
    <section id="not-found" className="flex min-h-[70vh] items-center py-24">
      <MaxWidthWrapper>
        <div className="max-w-xl">
          <p className="mb-6 font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-iris">
            Page Not Found
          </p>
          <h1 className="mb-6 font-serif text-7xl font-semibold leading-none text-iris md:text-9xl">
            404
          </h1>
          <p className="mb-10 font-sans text-lg leading-relaxed text-ink-soft">
            這個頁面找不到了。或許它已經被移走，或者連結出了一點問題。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="default">
              <Link href="/">回到首頁</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/posts">瀏覽文章</Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
