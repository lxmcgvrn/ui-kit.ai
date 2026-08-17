'use client'

import { DateInput, Description, Label, TimeField } from '@ui-kit.ai/components'

export default function TimeFieldDefault() {
  return (
    <TimeField>
      <Label>This is a label for a field</Label>
      <DateInput />
      <Description>This is a description for a field</Description>
    </TimeField>
  )
}
