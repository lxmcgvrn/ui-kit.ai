'use client'

import { Description, Label, Select, SelectButton } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'

export default function SelectDefault() {
    return (
        <Select items={getMockOptions<'listbox'>({ withIcon: true })}>
            <Label>This is a label for a field</Label>
            <SelectButton />
            <Description>This is a description for a field</Description>
        </Select>
    )
}
