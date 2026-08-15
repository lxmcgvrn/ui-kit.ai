'use client'

import { DateInput, Description, FieldError, Label, TimeField } from '@ui-kit.ai/components'

export default function TimeFieldInvalid() {
    return (
        <TimeField isInvalid>
            <Label>This is a label for a field</Label>
            <DateInput />
            <Description>This is a description for a field</Description>
            <FieldError>Pick a time during opening hours</FieldError>
        </TimeField>
    )
}
