'use client'

import { TextArea } from '@ui-kit.ai/components'

export default function TextAreaInvalid() {
  return (
    <TextArea
      aria-invalid
      aria-label='Notes'
      placeholder='This is a placeholder'
    />
  )
}
