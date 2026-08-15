'use client'

import { ColorPicker } from '@ui-kit.ai/components'

export default function ColorPickerWithLabel() {
    return (
        <ColorPicker
            defaultValue='#5B5BD6'
            label='Accent color'
        />
    )
}
