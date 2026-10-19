import { createHash } from 'node:crypto'

// Short, CSS-attribute-safe fingerprint of whatever content a visitor can dismiss.
export const getDismissalHash = (content: unknown): string =>
  createHash('sha256')
    .update(JSON.stringify(content ?? null))
    .digest('hex')
    .slice(0, 12)
