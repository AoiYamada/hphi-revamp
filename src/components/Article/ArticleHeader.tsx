import type { FC } from 'react'

import type { Post } from '@/payload-types'
import { CATEGORY_SEPARATOR, categoryTitles } from '@/utilities/categoryTitles'
import { formatDateZh } from '@/utilities/article/formatDateZh'
import { joinNames } from '@/utilities/article/joinNames'

type ArticleHeaderProps = {
  post: Pick<Post, 'title' | 'categories' | 'populatedAuthors' | 'publishedAt'>
  /** null when the article has no readable body: the reading-time item is then left out. */
  readingMinutes: number | null
}

const authorNames = (authors: Post['populatedAuthors']): string =>
  joinNames((authors ?? []).map((author) => author?.name ?? ''))

/**
 * Centred article head: category label, title, author / date / reading time, short lilac rule.
 * Every piece that has no data is left out entirely, so there are never empty boxes.
 */
export const ArticleHeader: FC<ArticleHeaderProps> = ({ post, readingMinutes }) => {
  const kicker = categoryTitles(post.categories).join(CATEGORY_SEPARATOR)
  const authors = authorNames(post.populatedAuthors)
  const date = post.publishedAt ? formatDateZh(post.publishedAt) : ''
  const hasMeta = Boolean(authors || date || readingMinutes)

  return (
    <header className="mx-auto w-full max-w-[760px] px-5 pt-10 text-center md:pt-16">
      {kicker && <p className="article-kicker">{kicker}</p>}
      <h1 className="article-title">{post.title}</h1>
      {hasMeta && (
        <p className="article-meta">
          {authors && <span className="article-author">{authors}</span>}
          {date && post.publishedAt && <time dateTime={post.publishedAt}>{date}</time>}
          {readingMinutes ? <span>{`閱讀約 ${readingMinutes} 分鐘`}</span> : null}
        </p>
      )}
      <div className="article-rule" aria-hidden="true" />
    </header>
  )
}
