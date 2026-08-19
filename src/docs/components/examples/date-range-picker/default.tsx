'use client'

import { DateRangePicker, DateRangePickerButton, DateRangePickerInput, Description, FieldGroup, Label } from '@ui-kit.ai/components'

export default function DateRangePickerDefault() {
  return (
    <DateRangePicker>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <DateRangePickerInput />
        <DateRangePickerButton />
      </FieldGroup>
      <Description>This is a description for a field</Description>
    </DateRangePicker>
  )
}
