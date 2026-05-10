import React, { FC } from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Bloom, IrisMark } from '@/components/Decoration'

export const CallToActionBlock: FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <section className="my-12 w-full">
      <div className="relative isolate">
        {/* Behind the glass: Soft Bloom backdrop with Bloom radials.
            The frost on the panel above refracts these into atmosphere. */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl bg-muted">
          <Bloom position="top-right" intensity="committed" size={70} />
          <Bloom position="bottom-left" intensity="medium" size={55} />
        </div>

        {/* Frosted glass panel. Sized to content, sits on top, blurs what's behind. */}
        <div className="relative overflow-hidden rounded-xl border border-white/40 bg-card/35 shadow-lift-1 backdrop-blur-xl backdrop-saturate-150">
          <IrisMark position="bottom-right" size={220} />

          <div className="relative flex flex-col gap-6 px-7 py-10 md:flex-row md:items-center md:justify-between md:gap-12 md:px-14 md:py-16">
            {richText && (
              <div className="prose md:prose-lg dark:prose-invert max-w-[36ch] md:flex-1">
                <RichText className="mb-0" data={richText} enableGutter={false} />
              </div>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-row flex-wrap gap-3 md:flex-shrink-0 md:flex-nowrap">
                {links.map(({ link }, i) => (
                  <CMSLink key={i} {...link} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
