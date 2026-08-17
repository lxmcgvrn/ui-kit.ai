'use client'

import type { ComponentProps } from 'react'

import { ColorArea, ColorPicker, ColorSlider, Label } from '@ui-kit.ai/components'
import { useState } from 'react'

type OnColorChange = NonNullable<ComponentProps<typeof ColorPicker>['onChange']>

export default function ColorPickerControlled() {
    const [value, setValue] = useState('#5B5BD6')

    const onChange: OnColorChange = (color) => {
        setValue(color.toString('hexa'))
    }

    return (
        <div className='flex items-start gap-4'>
            <ColorPicker
                onChange={onChange}
                value={value}
            >
                <Label>Accent color</Label>
                <ColorArea
                    colorSpace='hsb'
                    xChannel='saturation'
                    yChannel='brightness'
                />
                <ColorSlider
                    channel='hue'
                    colorSpace='hsb'
                />
            </ColorPicker>

            <span className='text-lo-contrast text-sm'>{value}</span>
        </div>
    )
}
