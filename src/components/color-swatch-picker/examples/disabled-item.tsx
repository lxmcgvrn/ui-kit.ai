'use client'

import { ColorSwatchPicker, ColorSwatchPickerItem } from '@ui-kit.ai/components'

import { PALETTE } from './palette'

const UNAVAILABLE = '#E5484D'

export default function ColorSwatchPickerDisabledItem() {
    return (
        <ColorSwatchPicker
            aria-label='Accent color'
            defaultValue={PALETTE[0]}
        >
            {PALETTE.map((color) => (
                <ColorSwatchPickerItem
                    color={color}
                    isDisabled={color === UNAVAILABLE}
                    key={color}
                />
            ))}
        </ColorSwatchPicker>
    )
}
