'use client'

import {
  Description,
  FieldButtonClear,
  FieldButtonCopy,
  FieldButtonVisibility,
  FieldGroup,
  Input,
  Label,
  NumberField,
} from '@ui-kit.ai/components'

export default function NumberFieldPasscode() {
  return (
    <NumberField
      defaultValue={123456}
      formatOptions={{ useGrouping: false }}
    >
      <Label>One-time passcode</Label>
      <FieldGroup>
        <Input isBorderless />
        <FieldButtonClear />
        <FieldButtonVisibility />
        <FieldButtonCopy />
      </FieldGroup>
      <Description>This is a description for a field</Description>
    </NumberField>
  )
}
