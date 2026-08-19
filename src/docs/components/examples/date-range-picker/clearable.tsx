'use client'

import { parseDate } from '@internationalized/date'
import { DateRangePicker, DateRangePickerButton, DateRangePickerInput, FieldButtonClear, FieldGroup, Label } from '@ui-kit.ai/components'

export default function DateRangePickerClearable() {
  return (
    <DateRangePicker defaultValue={{ end: parseDate('2026-08-22'), start: parseDate('2026-08-18') }}>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <DateRangePickerInput />
        <FieldButtonClear />
        <DateRangePickerButton />
      </FieldGroup>
    </DateRangePicker>
  )
}
