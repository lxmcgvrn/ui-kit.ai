'use client'

import { ColorSwatchPicker, ColorSwatchPickerItem } from '@ui-kit.ai/components'

import { PALETTE } from './palette'

export default function ColorSwatchPickerDefault() {
    return (
        <ColorSwatchPicker
            aria-label='Accent color'
            defaultValue={PALETTE[0]}
        >
            {PALETTE.map((color) => (
                <ColorSwatchPickerItem
                    color={color}
                    key={color}
                />
            ))}
        </ColorSwatchPicker>
    )
}
