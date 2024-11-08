import { cn } from '@/utilities/cn'
import type { FC } from 'react'

import { serializeLexical } from './serialize'

type RichTextProps = {
  className?: string
  content: Record<string, any>
  enableGutter?: boolean
  enableProse?: boolean
}

const RichText: FC<RichTextProps> = ({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'w-full': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose dark:prose-invert': enableProse,
        },
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText
