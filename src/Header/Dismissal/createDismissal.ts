import { createHash } from 'node:crypto'

import type { Dismissal, DismissibleId } from './dismissal'

// `content` should be only what the visitor sees: any change to it re-shows the element to
// visitors who dismissed it. The hash is a short, CSS-attribute-safe fingerprint.
export const createDismissal = (id: DismissibleId, content: unknown): Dismissal => ({
  id,
  hash: createHash('sha256')
    .update(JSON.stringify(content ?? null))
    .digest('hex')
    .slice(0, 12),
})
