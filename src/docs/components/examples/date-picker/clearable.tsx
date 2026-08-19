'use client'

import { parseDate } from '@internationalized/date'
import { DateInput, DatePicker, DatePickerButton, FieldButtonClear, FieldGroup, Label } from '@ui-kit.ai/components'

export default function DatePickerClearable() {
  return (
    <DatePicker defaultValue={parseDate('2026-08-18')}>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <DateInput isBorderless />
        <FieldButtonClear />
        <DatePickerButton />
      </FieldGroup>
    </DatePicker>
  )
}
