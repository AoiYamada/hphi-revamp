import Image from 'next/image'
import React, { FC } from 'react'

const CmsLogo: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <Image
        src="/hphi-logo-bg.png"
        alt="專業心理治療及催眠應用（香港）有限公司（HPHI） Logo"
        width={225}
        height={160}
        style={{
          borderRadius: '0.25rem',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            textWrap: 'nowrap',
            fontSize: '2rem',
            lineHeight: '3rem',
          }}
        >
          專業心理治療及催眠應用（香港）有限公司
        </span>
        <span
          style={{
            textWrap: 'nowrap',
            fontSize: '1.5rem',
            lineHeight: '2.25rem',
          }}
        >
          HPHI EDUCATION LIMITED
        </span>
      </div>
    </div>
  )
}

export default CmsLogo
