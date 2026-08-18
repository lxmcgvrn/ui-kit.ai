'use client'

import { ColorField, FieldButtonClear, FieldButtonCopy, FieldGroup, Input, Label } from '@ui-kit.ai/components'

export default function ColorFieldWithButtons() {
  return (
    <ColorField defaultValue='#5000ff'>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <Input isBorderless />
        <FieldButtonClear />
        <FieldButtonCopy />
      </FieldGroup>
    </ColorField>
  )
}
