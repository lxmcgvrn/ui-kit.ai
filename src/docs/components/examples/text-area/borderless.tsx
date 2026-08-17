'use client'

import { TextArea } from '@ui-kit.ai/components'

export default function TextAreaBorderless() {
  return (
    <TextArea
      aria-label='Notes'
      isBorderless
      placeholder='This is a placeholder'
    />
  )
}
