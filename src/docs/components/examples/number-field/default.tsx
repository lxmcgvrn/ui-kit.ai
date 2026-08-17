'use client'

import {
  Description,
  FieldGroup,
  Input,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
} from '@ui-kit.ai/components'

export default function NumberFieldDefault() {
  return (
    <NumberField defaultValue={8}>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <Input isBorderless />
        <NumberFieldDecrementButton />
        <NumberFieldIncrementButton />
      </FieldGroup>
      <Description>This is a description for a field</Description>
    </NumberField>
  )
}
