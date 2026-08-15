'use client'

import {
    DatePicker,
    DatePickerFieldGroup,
    Description,
    FieldError,
    Label,
} from '@ui-kit.ai/components'

export default function DatePickerInvalid() {
    return (
        <DatePicker isInvalid>
            <Label>This is a label for a field</Label>
            <DatePickerFieldGroup />
            <Description>This is a description for a field</Description>
            <FieldError>Pick a date in the future</FieldError>
        </DatePicker>
    )
}
