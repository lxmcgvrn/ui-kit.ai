'use client'

import {
  Description,
  FieldButtonClear,
  FieldButtonCopy,
  FieldButtonVisibility,
  FieldGroup,
  Input,
  Label,
  TextField,
} from '@ui-kit.ai/components'

export default function TextFieldDefault() {
  return (
    <TextField>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <Input
          isBorderless
          placeholder='This is a placeholder'
        />
        <FieldButtonClear />
        <FieldButtonVisibility />
        <FieldButtonCopy />
      </FieldGroup>
      <Description>This is a description for a field</Description>
    </TextField>
  )
}
