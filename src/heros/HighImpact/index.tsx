import type { FC } from 'react'
import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Bloom, IrisMark } from '@/components/Decoration'

export const HighImpactHero: FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-[68vh]">
      {media && typeof media === 'object' && (
        <Media
          fill
          imgClassName="absolute inset-0 -z-20 object-cover"
          priority
          loading="eager"
          resource={media}
        />
      )}

      {/* Atmosphere */}
      <IrisMark position="top-right" size={280} className="text-white/15" />

      <MaxWidthWrapper className="relative z-10 flex w-full items-center py-24 md:py-32">
        <div className="max-w-2xl text-primary-foreground">
          {richText && (
            <div className="prose prose-invert mb-8 max-w-none">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
