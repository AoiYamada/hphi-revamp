'use client'
import React, { FC } from 'react'
import { TextFieldClientProps } from 'payload'
import { useField, TextInput, FieldLabel } from '@payloadcms/ui'

type YouTubeComponentProps = TextFieldClientProps

export const YouTubeComponent: FC<YouTubeComponentProps> = ({ field, path }) => {
  const { label } = field
  const { value, setValue } = useField<string>({ path: path || field.name })
  const videoId = (value ?? '').split('v=')[1]
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : ''

  return (
    <div className="youtube-field-component">
      <FieldLabel htmlFor={`field-${path}`} label={label} />
      <TextInput value={value} onChange={setValue} path={path || field.name} />
      {embedUrl && (
        <div className="youtube-preview">
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-iframe"
          ></iframe>
        </div>
      )}
    </div>
  )
}
