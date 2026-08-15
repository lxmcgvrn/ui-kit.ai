'use client'

import {
    DateRangePicker,
    DateRangePickerFieldGroup,
    Description,
    FieldError,
    Label,
} from '@ui-kit.ai/components'

export default function DateRangePickerInvalid() {
    return (
        <DateRangePicker isInvalid>
            <Label>This is a label for a field</Label>
            <DateRangePickerFieldGroup />
            <Description>This is a description for a field</Description>
            <FieldError>Pick a range that starts today or later</FieldError>
        </DateRangePicker>
    )
}
