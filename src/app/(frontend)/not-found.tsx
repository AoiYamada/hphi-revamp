import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Bloom, IrisMark } from '@/components/Decoration'

export default function NotFound() {
  return (
    <section
      id="not-found"
      className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-24"
    >
      <Bloom position="top-right" intensity="medium" size={70} />
      <Bloom position="bottom-left" intensity="subtle" size={60} />
      <IrisMark position="bottom-right" size={300} />

      <MaxWidthWrapper>
        <div className="max-w-xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Page Not Found
          </p>
          <h1 className="mb-6 text-7xl font-light leading-none tracking-tight text-secondary md:text-9xl">
            404
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
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
