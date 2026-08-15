'use client'

import {
    DateRangePicker,
    DateRangePickerFieldGroup,
    Description,
    Label,
} from '@ui-kit.ai/components'

export default function DateRangePickerDisabled() {
    return (
        <DateRangePicker isDisabled>
            <Label>This is a label for a field</Label>
            <DateRangePickerFieldGroup />
            <Description>This is a description for a field</Description>
        </DateRangePicker>
    )
}
