import type { Metadata } from 'next'

import { cn } from '@/utilities'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React, { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import FacebookPixel from '@/components/FacebookPixel'
import { fbId } from '@/lib/f-pixel'
import AnimatedWhatsAppUs from '@/components/AnimatedWhatsAppUs'

const gaId = process.env.NEXT_PUBLIC_GA_ID
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const isDev = process.env.NODE_ENV !== 'production'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang="zh-HK"
      // to get rid of the hydration warning caused by extensions
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {googleSiteVerification && (
          <meta name="google-site-verification" content={googleSiteVerification} />
        )}
        {!isDev && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PKF7RMHZ');`}
          </Script>
        )}
      </head>
      <body className="bg-primary/10">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
        {!isDev && fbId && <FacebookPixel fbId={fbId} />}
        <AnimatedWhatsAppUs />
      </body>
      {!isDev && gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@hphi',
  },
}
