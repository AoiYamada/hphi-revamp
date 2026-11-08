import type { FC } from 'react'

// Writes the header's first-paint height into --header-h while the page is still being parsed, so
// opening a link such as /posts/some-article#section-3 scrolls to a heading that already clears the
// header (announcement included). HeaderHeightVar takes over from there and tracks changes.
// Must render right after the <header> it measures.
const SCRIPT = `try{var h=document.querySelector('[data-site-header]');if(h)document.documentElement.style.setProperty('--header-h',Math.ceil(h.getBoundingClientRect().height)+'px')}catch(e){}`

export const HeaderHeightScript: FC = () => <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
