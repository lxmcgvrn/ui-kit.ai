'use client'

import { DateField, DateInput, Description, Label } from '@ui-kit.ai/components'

export default function DateFieldDisabled() {
    return (
        <DateField isDisabled>
            <Label>This is a label for a field</Label>
            <DateInput />
            <Description>This is a description for a field</Description>
        </DateField>
    )
}
