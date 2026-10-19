// Shared between the server-rendered DismissalGuard and the client-side useDismissal hook.
// A dismissal is remembered per tab (sessionStorage) and keyed by a hash of the dismissed
// content, so publishing new content shows it again even to visitors who closed the old one.

export type DismissibleId = 'announcement' | 'social-strip'

export const dismissalStorageKey = (id: DismissibleId) => `hphi:dismissed:${id}`

// Set on <html> before first paint by DismissalGuard's inline script.
export const dismissalAttribute = (id: DismissibleId) => `data-dismissed-${id}`

// Spread on the dismissible element's root so DismissalGuard's CSS can hide it.
export const dismissibleAttribute = 'data-dismissible'
export const dismissibleProps = (id: DismissibleId) => ({ [dismissibleAttribute]: id })
