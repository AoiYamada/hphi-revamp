'use client'

// import { Header } from '@/payload-types'
import { useRowLabel } from '@payloadcms/ui'

// type Tab = NonNullable<Header['tabs']>[number]
type Tab = {
  label: string
  navItems: NavItem[]
}

export const Tabs = () => {
  const { data } = useRowLabel<Tab>()

  return data.label || '...'
}

// type NavItem = NonNullable<Tab['navItems']>[number]
type NavItem = {
  style: 'default' | 'featured' | 'list'
  defaultLink?: {
    link: {
      label: string
    }
  }
  featuredLink?: {
    label: string
  }
  listLinks?: {
    label: string
  }
}

export const NavItem = () => {
  const { data } = useRowLabel<NavItem>()

  if (data.style === 'default') {
    return data.defaultLink?.link.label
  }

  if (data.style === 'featured') {
    return data.featuredLink?.label
  }

  if (data.style === 'list') {
    return data.listLinks?.label
  }

  return '...'
}
