'use client'

import {
  Description,
  FieldGroup,
  Input,
  Label,
  TextField,
  TextFieldClearButton,
  TextFieldCopyButton,
  TextFieldVisibilityButton,
} from '@ui-kit.ai/components'

export default function TextFieldReadOnly() {
  return (
    <TextField isReadOnly>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <Input
          isBorderless
          placeholder='This is a placeholder'
        />
        <TextFieldClearButton />
        <TextFieldVisibilityButton />
        <TextFieldCopyButton />
      </FieldGroup>
      <Description>This is a description for a field</Description>
    </TextField>
  )
}
