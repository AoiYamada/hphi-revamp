import { cn } from '@/utilities'
import { BookOpen } from 'lucide-react'
import React, { FC, ReactNode } from 'react'

type Props = {
  cover: ReactNode
  className?: string
  // In the list the cover is only a picture of the book: a video cover's controls must not
  // take focus or clicks there (the title button opens the dialog, where the video plays).
  inert?: boolean
}

// Covers are rendered with `fill`, so the frame alone sets their size and 2:3 book shape.
// The placeholder sits underneath, so it also shows through a video cover with no poster.
export const CoverFrame: FC<Props> = ({ cover, className, inert }) => (
  <div
    className={cn('relative aspect-[2/3] shrink-0 overflow-hidden bg-muted', className)}
    inert={inert}
  >
    <BookOpen aria-hidden className="absolute inset-0 m-auto size-5 text-muted-foreground" />
    {cover}
  </div>
)
