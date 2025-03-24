import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UploadForm from '@/components/UploadForm'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  return (
    <MaxWidthWrapper className="pt-24 pb-24">
      <UploadForm />
    </MaxWidthWrapper>
  )
}
