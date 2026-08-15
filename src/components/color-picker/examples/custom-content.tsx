'use client'

import { ColorPicker, ColorSwatchPicker, ColorSwatchPickerItem } from '@ui-kit.ai/components'

const PALETTE = ['#5B5BD6', '#3E63DD', '#12A594', '#E5484D', '#FFB224', '#8E4EC6']

export default function ColorPickerCustomContent() {
    return (
        <ColorPicker
            defaultValue={PALETTE[0]}
            label='Accent color'
        >
            <ColorSwatchPicker
                aria-label='Accent color'
                className='w-40'
            >
                {PALETTE.map((color) => (
                    <ColorSwatchPickerItem
                        color={color}
                        key={color}
                    />
                ))}
            </ColorSwatchPicker>
        </ColorPicker>
    )
}
