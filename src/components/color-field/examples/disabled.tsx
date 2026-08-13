'use client'

import { ColorField, Input, Label } from '@ui-kit.ai/components'

export default function ColorFieldDisabled() {
    return (
        <ColorField
            defaultValue='#5000ff'
            isDisabled
        >
            <Label>This is a label for a field</Label>
            <Input />
        </ColorField>
    )
}
