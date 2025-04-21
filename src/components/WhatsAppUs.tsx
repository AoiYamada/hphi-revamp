import { FC } from 'react'
import { WhatsApp } from './icons/WhatsApp'
import { cn } from '@/utilities'
import Link from 'next/link'

type WhatsAppUsProps = {
  link: string
  className?: string
}

const WhatsAppUs: FC<WhatsAppUsProps> = ({ link, className }) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex justify-center items-center cursor-pointer group bg-green-500 text-white rounded-3xl',
        className,
      )}
    >
      <p
        className={cn(
          'text-nowrap overflow-hidden',
          'm-0 lg:group-hover:ml-7',
          'w-0 lg:group-hover:w-[calc-size(auto,size)]',
          'opacity-0 lg:group-hover:opacity-100',
          'transition-all duration-300 ease-in-out',
        )}
      >
        WhatsApp 我們
      </p>
      <div className="p-5">
        <WhatsApp className="pointer-events-none block h-7 w-7" />
      </div>
    </Link>
  )
}

export default WhatsAppUs
