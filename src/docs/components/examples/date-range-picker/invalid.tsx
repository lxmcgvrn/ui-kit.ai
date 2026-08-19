'use client'

import {
  DateRangePicker,
  DateRangePickerButton,
  DateRangePickerInput,
  Description,
  FieldError,
  FieldGroup,
  Label,
} from '@ui-kit.ai/components'

export default function DateRangePickerInvalid() {
  return (
    <DateRangePicker isInvalid>
      <Label>This is a label for a field</Label>
      <FieldGroup>
        <DateRangePickerInput />
        <DateRangePickerButton />
      </FieldGroup>
      <Description>This is a description for a field</Description>
      <FieldError>Pick a range that starts today or later</FieldError>
    </DateRangePicker>
  )
}
