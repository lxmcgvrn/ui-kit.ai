'use client'

import { DateField, DateInput, Description, FieldError, Label } from '@ui-kit.ai/components'

export default function DateFieldInvalid() {
    return (
        <DateField isInvalid>
            <Label>This is a label for a field</Label>
            <DateInput />
            <Description>This is a description for a field</Description>
            <FieldError>Pick a date in the future</FieldError>
        </DateField>
    )
}
