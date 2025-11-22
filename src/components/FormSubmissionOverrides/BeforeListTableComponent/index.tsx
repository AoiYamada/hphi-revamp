'use client'

import React, { useState } from 'react'
import type { BeforeListTableServerProps } from 'payload'
import './index.scss'

export const BeforeListTableComponent = ({ payload }: BeforeListTableServerProps) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/form-submissions/export', {
        method: 'POST',
      })

      if (response.ok) {
        // Get the response as a blob
        const blob = await response.blob()

        // Create a download URL
        const url = window.URL.createObjectURL(blob)

        // Create a temporary anchor element to trigger download
        const a = document.createElement('a')
        a.href = url
        a.download = 'nlp-course-submissions.csv' // Make sure this matches your backend filename

        // Append to body, click, and cleanup
        document.body.appendChild(a)
        a.click()

        // Cleanup
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error('Export failed:', response.statusText)
      }
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="export-form">
      <input
        type="submit"
        value={loading ? '導出中...' : '導出 NLP 報名資料'}
        disabled={loading}
        className="export-button"
      />
    </form>
  )
}
