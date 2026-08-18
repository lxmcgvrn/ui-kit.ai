'use client'

import { FieldButtonClear, FieldButtonCopy, FieldButtonVisibility, FieldGroup, Input, TextField } from '@ui-kit.ai/components'

export default function FieldGroupDefault() {
  return (
    <FieldGroup>
      <TextField aria-label='City'>
        <Input
          isBorderless
          placeholder='Enter your city...'
        />
      </TextField>
      <FieldButtonClear />
      <FieldButtonVisibility />
      <FieldButtonCopy />
    </FieldGroup>
  )
}
