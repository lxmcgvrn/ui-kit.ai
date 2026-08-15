'use client'

import { DatePicker, DatePickerFieldGroup, Description, Label } from '@ui-kit.ai/components'

export default function DatePickerDisabled() {
    return (
        <DatePicker isDisabled>
            <Label>This is a label for a field</Label>
            <DatePickerFieldGroup />
            <Description>This is a description for a field</Description>
        </DatePicker>
    )
}
