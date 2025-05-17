import { FC, ReactNode } from 'react'
import FooterNavLink from './FooterNavLink'
import { Footer } from '@/payload-types'
import { WhatsApp } from '@/components/icons/WhatsApp'
import { Instagram } from '@/components/icons/Instagram'
import { Mail, Phone } from 'lucide-react'
import { YouTube } from '@/components/icons/YouTube'
import { Facebook } from '@/components/icons/Facebook'
import { CMSLink } from '@/components/Link'

type FooterNavColumnProps = NonNullable<Footer['columns']>[number]

const IconsMap = {
  none: undefined,
  whatsapp: <WhatsApp />,
  instagram: <Instagram />,
  youtube: <YouTube />,
  facebook: <Facebook />,
  mail: <Mail />,
  phone: <Phone />,
}

const FooterNavColumn: FC<FooterNavColumnProps> = ({ label, enableDirectLink, link, navItems }) => {
  const items = navItems ?? []
  let title: ReactNode = label
  if (enableDirectLink) {
    title = (
      <CMSLink {...link} appearance="inline" className="hover:underline underline-offset-4">
        {label}
      </CMSLink>
    )
  }

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      {items.length > 0 && (
        <ul className="text-md flex flex-col items-start justify-start gap-1">
          {items.map(({ icon, link }) => (
            <FooterNavLink key={link.label} icon={IconsMap[icon ?? 'none']} link={link} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default FooterNavColumn
