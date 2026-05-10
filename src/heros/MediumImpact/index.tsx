import type { FC } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Bloom } from '@/components/Decoration'

export const MediumImpactHero: FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="relative isolate my-12 md:my-20">
      <Bloom position="top-left" intensity="subtle" size={60} />

      <MaxWidthWrapper>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            {richText && (
              <div className="prose md:prose-lg mb-6 max-w-none">
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

          {media && typeof media === 'object' && (
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-border shadow-lift-1">
                <Media
                  imgClassName="w-full h-auto object-cover"
                  priority={false}
                  loading="lazy"
                  resource={media}
                />
              </div>
              {media?.caption && (
                <div className="prose prose-sm mt-3 text-muted-foreground">
                  <RichText data={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
