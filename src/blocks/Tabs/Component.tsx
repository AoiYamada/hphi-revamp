import { TabsBlock as TabsBlockProps } from '@/payload-types'
import LifeEnrichLikeTabs from '@/components/LifeEnrichLikeTabs'
import { FC } from 'react'

export const TabsBlock: FC<TabsBlockProps & { id?: string }> = (props) => {
  return <LifeEnrichLikeTabs {...props} />
}
