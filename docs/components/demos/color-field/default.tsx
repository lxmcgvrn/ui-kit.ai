'use client'

import { ColorField, Input, Label } from '@ui-kit.ai/components'

export default function ColorFieldDefault() {
    return (
        <ColorField defaultValue='#5000ff'>
            <Label>This is a label for a field</Label>
            <Input />
        </ColorField>
    )
}
