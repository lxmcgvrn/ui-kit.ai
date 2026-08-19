'use client'

import { parseDate } from '@internationalized/date'
import { DateField, DateInput, FieldButtonClear, FieldGroup, Label } from '@ui-kit.ai/components'

export default function DateFieldClearable() {
  return (
    <DateField defaultValue={parseDate('2026-08-18')}>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <DateInput isBorderless />
        <FieldButtonClear />
      </FieldGroup>
    </DateField>
  )
}
