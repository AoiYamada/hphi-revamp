import type { FC } from 'react'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'
import { cn } from '@/utilities'
import { annotateH2Anchors, splitLede } from '@/utilities/article/headings'
import { estimateReadingMinutes } from '@/utilities/article/readingTime'

import { ArticleHeader } from './ArticleHeader'

/** Widest the cover and the related-posts row get; the 190 + 620 + 190 grid sits inside it. */
const FRAME = 'mx-auto w-full max-w-[1160px]'

/** Cover sizes for next/image: the cover is at most 1120px wide, full viewport width on phones. */
const COVER_SIZES = '(min-width: 1160px) 1120px, 100vw'

type Content = Post['content']

const hasNodes = (content: Content | null | undefined): content is Content =>
  Array.isArray(content?.root?.children)

/** Splits the body into lede + rest and numbers the H2s. A post without content gets neither. */
const prepareBody = (content: Content | null | undefined) => {
  if (!hasNodes(content)) return { lede: null, body: null, readingMinutes: null }

  const { state } = annotateH2Anchors(content)
  const { lede, body } = splitLede(state)
  return { lede, body, readingMinutes: estimateReadingMinutes(content) }
}

/**
 * Book-style article page shared by /posts/[slug] and /single-post/[slug].
 * Header, optional cover, a three-column grid (TOC | 620px body | spare) and related posts.
 */
export const ArticleLayout: FC<{ post: Post }> = ({ post }) => {
  const { lede, body, readingMinutes } = prepareBody(post.content)
  const cover = post.meta?.image && typeof post.meta.image === 'object' ? post.meta.image : null
  const relatedPosts = (post.relatedPosts ?? []).filter(
    (related): related is Post => typeof related === 'object' && related !== null,
  )

  return (
    <article className="pb-20 md:pb-24">
      <ArticleHeader post={post} readingMinutes={readingMinutes} />

      {cover && (
        <div className={cn(FRAME, 'mt-8 md:mt-10 md:px-5')}>
          <Media
            priority
            fill
            loading="eager"
            size={COVER_SIZES}
            resource={cover}
            className="article-cover relative aspect-[4/3] w-full overflow-hidden md:aspect-[2/1] md:max-h-[560px] md:rounded-sm"
            imgClassName="object-cover"
          />
        </div>
      )}

      <div
        className={cn(
          FRAME,
          'article-grid mt-10 grid grid-cols-[minmax(0,620px)] justify-center gap-10 px-5 md:mt-12',
          'xl:grid-cols-[190px_minmax(0,620px)_190px]',
        )}
      >
        <aside data-toc-desktop className="hidden xl:block" />
        <div className="article-body min-w-0">
          {lede && (
            <RichText
              data={lede}
              enableGutter={false}
              enableProse={false}
              className="article-richtext article-lede"
            />
          )}
          <div data-toc-inline />
          {body && (
            <RichText
              data={body}
              enableGutter={false}
              enableProse={false}
              className={cn('article-richtext', !lede && 'article-richtext-first')}
            />
          )}
        </div>
      </div>

      <div id="article-end" />

      {relatedPosts.length > 0 && (
        <section className={cn(FRAME, 'mt-20 px-5 md:mt-28')}>
          <h2 className="article-related-title">相關文章</h2>
          <RelatedPosts docs={relatedPosts} />
        </section>
      )}
    </article>
  )
}
