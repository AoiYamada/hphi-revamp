import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    '專業心理治療(香港)中心 HPHI 是一所為普羅市民提供專業心理輔導服務的機構，並提供一系列的催眠師課程，包括NLP、NGH、PBH 等國際認可的心理治療、催眠課程。',
  images: [
    {
      url: `${getServerSideURL()}/hphi-logo-bg.png`,
    },
  ],
  siteName: '專業心理治療及催眠應用（香港）有限公司',
  title: '專業心理治療及催眠應用（香港）有限公司',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
