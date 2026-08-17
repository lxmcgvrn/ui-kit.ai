'use client'

import { DateField, DateInput, Description, Label } from '@ui-kit.ai/components'

export default function DateFieldGranularity() {
    return (
        <DateField granularity='minute'>
            <Label>This is a label for a field</Label>
            <DateInput />
            <Description>This is a description for a field</Description>
        </DateField>
    )
}
