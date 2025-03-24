'use client'

// import { useState } from 'react'
import {
  Control,
  // Controller,
  FieldErrorsImpl,
  //  useFormContext
} from 'react-hook-form'
// import { Button } from '../../../components/ui/button'
// import { Upload } from '@/payload-types'
// import { Width } from '../Width'
// import { Label } from '@/components/ui/label'
import { UploadImageField } from '../custom-fields'
// import { Error } from '../Error'
// import { Input } from '@/components/ui/input'

// type UploadResponse = {
//   doc: Upload
//   message: string
// }

export const UploadImage: React.FC<
  UploadImageField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, required, width }) => {
  return <></>
  // const [isUploading, setIsUploading] = useState(false)
  // const [uploadData, setUploadData] = useState<Upload | undefined>()

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0]
  //   if (!file) return

  //   setIsUploading(true)
  //   const formData = new FormData()
  //   formData.append('file', file)

  //   const response = await fetch('/api/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //   const result = (await response.json()) as UploadResponse

  //   setIsUploading(false)
  //   setUploadData(result.doc)

  //   return result.doc.id
  // }

  // const handleReset = () => {
  //   setUploadData(undefined)
  // }

  // return (
  // <Width width={width}>
  //   <Label htmlFor={name}>{label}</Label>
  //   <div className="w-full">
  //     <Controller
  //       control={control}
  //       name={name}
  //       render={({ field: { onChange, value } }) => {
  //         return (
  //           <>
  //             <Input
  //               type="file"
  //               accept="image/jpeg,image/png,image/webp"
  //               onChange={async (event) => {
  //                 const id = await handleFileChange(event)
  //                 onChange(id)
  //               }}
  //               disabled={isUploading}
  //               placeholder="上載圖片"
  //             />
  //             {isUploading && <p>上載中...</p>}
  //             {uploadData && (
  //               <div>
  //                 <p>{value ?? 'no image'}</p>
  //                 <p>{uploadData.filename}</p>
  //                 <p>{uploadData.filesize} bytes</p>
  //                 <p>
  //                   {uploadData.width}px x {uploadData.height}px
  //                 </p>
  //                 <Button
  //                   onClick={() => {
  //                     handleReset()
  //                     onChange(undefined)
  //                   }}
  //                 >
  //                   刪除
  //                 </Button>
  //               </div>
  //             )}
  //           </>
  //         )
  //       }}
  //       rules={{ required }}
  //     />
  //   </div>
  //   {required && errors[name] && <Error />}
  // </Width>
  // )
}
