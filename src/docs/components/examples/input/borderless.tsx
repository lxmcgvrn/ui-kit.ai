'use client'

import { Input } from '@ui-kit.ai/components'

export default function InputBorderless() {
  return (
    <Input
      aria-label='Query'
      isBorderless
      placeholder='This is a placeholder'
    />
  )
}
