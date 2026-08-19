'use client'

import { DateInput, DatePicker, DatePickerButton, Description, FieldError, FieldGroup, Label } from '@ui-kit.ai/components'

export default function DatePickerInvalid() {
  return (
    <DatePicker isInvalid>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <DateInput isBorderless />
        <DatePickerButton />
      </FieldGroup>
      <Description>This is a description for a field</Description>
      <FieldError>Pick a date in the future</FieldError>
    </DatePicker>
  )
}
