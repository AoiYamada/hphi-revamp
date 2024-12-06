import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function NotFound() {
  return (
    <section className="w-full pt-16 pb-24" id="not-found">
      <MaxWidthWrapper>
        <div className="prose max-w-none">
          <h1 style={{ marginBottom: 0 }}>404</h1>
          <p className="mb-4">This page could not be found.</p>
        </div>
        <Button asChild variant="default">
          <Link href="/">Go home</Link>
        </Button>
      </MaxWidthWrapper>
    </section>
  )
}
