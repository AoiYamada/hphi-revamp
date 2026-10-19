import type { FC } from 'react'

import {
  type Dismissal,
  dismissalAttribute,
  dismissalStorageKey,
  dismissibleAttribute,
} from './dismissal'

type DismissalGuardProps = {
  entries: Dismissal[]
}

// Hides already-dismissed elements before React hydrates, so a reload doesn't flash them and
// shift the page. Must render before the elements it guards. The inline script copies each
// stored hash onto <html>; the CSS only matches when that hash equals the current content's.
export const DismissalGuard: FC<DismissalGuardProps> = ({ entries }) => {
  const pairs = JSON.stringify(
    entries.map(({ id }) => [dismissalStorageKey(id), dismissalAttribute(id)]),
  )
  const script = `try{${pairs}.forEach(function(p){var v=sessionStorage.getItem(p[0]);if(v)document.documentElement.setAttribute(p[1],v)})}catch(e){}`

  const css = entries
    .map(
      ({ id, hash }) =>
        `html[${dismissalAttribute(id)}="${hash}"] [${dismissibleAttribute}="${id}"]{display:none}`,
    )
    .join('')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  )
}
