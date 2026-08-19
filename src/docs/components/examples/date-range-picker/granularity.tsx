'use client'

import { DateRangePicker, DateRangePickerButton, DateRangePickerInput, Description, FieldGroup, Label } from '@ui-kit.ai/components'

export default function DateRangePickerGranularity() {
  return (
    <DateRangePicker granularity='minute'>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <DateRangePickerInput />
        <DateRangePickerButton />
      </FieldGroup>
      <Description>This is a description for a field</Description>
    </DateRangePicker>
  )
}
