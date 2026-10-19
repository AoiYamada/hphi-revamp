'use client'

import { useCallback, useSyncExternalStore } from 'react'

import { type Dismissal, type DismissibleId, dismissalStorageKey } from './dismissal'

// In-memory copy so dismissing still works for the current page view when sessionStorage is
// unavailable (blocked storage, some private modes) — it just won't survive a reload.
const memory = new Map<DismissibleId, string>()
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const readDismissedHash = (id: DismissibleId): string | null => {
  try {
    return window.sessionStorage.getItem(dismissalStorageKey(id)) ?? memory.get(id) ?? null
  } catch {
    return memory.get(id) ?? null
  }
}

const writeDismissedHash = (id: DismissibleId, hash: string) => {
  memory.set(id, hash)
  try {
    window.sessionStorage.setItem(dismissalStorageKey(id), hash)
  } catch {
    // Falls back to `memory`; see above.
  }
  listeners.forEach((listener) => listener())
}

export const useDismissal = ({ id, hash }: Dismissal) => {
  // The server snapshot (nothing dismissed) matches the SSR markup; DismissalGuard keeps an
  // already-dismissed element hidden until React switches to the client snapshot.
  const dismissedHash = useSyncExternalStore(
    subscribe,
    () => readDismissedHash(id),
    () => null,
  )

  const dismiss = useCallback(() => writeDismissedHash(id, hash), [id, hash])

  return { isDismissed: dismissedHash === hash, dismiss }
}
