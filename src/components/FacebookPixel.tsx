'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { FC, useEffect, useState } from 'react'
import * as pixel from '@/lib/f-pixel'

type FacebookPixelProps = {
  fbId: string
}

const FacebookPixel: FC<FacebookPixelProps> = ({ fbId }) => {
  const [loaded, setLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!loaded) return

    pixel.view()
  }, [pathname, loaded])

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={fbId}
      />
    </div>
  )
}

export default FacebookPixel
