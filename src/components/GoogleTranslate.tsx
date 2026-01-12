'use client'

import Script from 'next/script'
import React, { useEffect } from 'react'

export default function GoogleTranslate() {
  useEffect(() => {
    let timer: NodeJS.Timeout
    // Initialize Google Translate
    const initializeGoogleTranslate = () => {
      if (
        window.google &&
        window.google.translate &&
        window.google.translate?.TranslateElement?.InlineLayout?.SIMPLE
      ) {
        clearInterval(timer)
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'zh-HK',
            includedLanguages: 'en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google-translate-element',
        )

        // Style the translate widget
        const styleElement = document.createElement('style')
        styleElement.textContent = `
          .goog-te-gadget {
            font-family: inherit !important;
          }
          .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
            display: flex;
          }
          .goog-te-gadget-simple a {
            display: flex;
          }
          .goog-te-gadget-simple .goog-te-combo {
            background-color: transparent !important;
            border: 1px solid #ddd !important;
            border-radius: 4px !important;
            padding: 6px 8px !important;
            font-size: 14px !important;
            cursor: pointer !important;
          }
          .goog-te-menu-value {
            color: #333 !important;
          }
          .goog-te-menu-value span {
            display: none;
          }
        `
        document.head.appendChild(styleElement)
      }
    }

    // Add small delay to ensure Google Translate script is loaded
    timer = setInterval(initializeGoogleTranslate, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div id="google-translate-element" className="!m-0" />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'zh-HK',
                includedLanguages: 'en',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              'google-translate-element',
            )
          }
        }}
      />
    </>
  )
}

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          InlineLayout: {
            SIMPLE: number
          }
          new (
            options: {
              pageLanguage: string
              includedLanguages: string
              layout: number
              autoDisplay: boolean
            },
            elementId: string,
          ): void
        }
      }
    }
  }
}
