'use client'

import { DateInput, DatePicker, DatePickerButton, Description, FieldGroup, Label } from '@ui-kit.ai/components'

export default function DatePickerDefault() {
  return (
    <DatePicker>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <DateInput isBorderless />
        <DatePickerButton />
      </FieldGroup>
      <Description>This is a description for a field</Description>
    </DatePicker>
  )
}
