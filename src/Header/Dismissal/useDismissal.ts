'use client'

import { useCallback, useEffect, useState } from 'react'

import { type DismissibleId, dismissalStorageKey } from './dismissal'

// sessionStorage can throw (blocked storage, some private modes). Falling back to "not
// dismissed" / "not remembered" is the intended behaviour, not an error worth surfacing.
const readDismissedHash = (id: DismissibleId): string | null => {
  try {
    return window.sessionStorage.getItem(dismissalStorageKey(id))
  } catch {
    return null
  }
}

const writeDismissedHash = (id: DismissibleId, hash: string) => {
  try {
    window.sessionStorage.setItem(dismissalStorageKey(id), hash)
  } catch {
    // Still hidden for this page view via state; just won't survive a reload.
  }
}

export const useDismissal = (id: DismissibleId, hash: string) => {
  // Starts false to match the server render; DismissalGuard keeps it hidden until then.
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    setIsDismissed(readDismissedHash(id) === hash)
  }, [id, hash])

  const dismiss = useCallback(() => {
    writeDismissedHash(id, hash)
    setIsDismissed(true)
  }, [id, hash])

  return { isDismissed, dismiss }
}
