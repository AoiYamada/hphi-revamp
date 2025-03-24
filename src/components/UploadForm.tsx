'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'

// testing code
const UploadForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const [isUploading, setIsUploading] = useState(false)

  const onSubmit = async (data) => {
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', data.file[0])

    await fetch('api/upload', {
      method: 'POST',
      body: formData,
    })

    setIsUploading(false)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register('file')} />
      <Button type="submit" variant="default" disabled={isUploading}>
        上載
      </Button>
    </form>
  )
}

export default UploadForm
