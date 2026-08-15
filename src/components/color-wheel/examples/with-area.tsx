'use client'

import type { ComponentProps } from 'react'

import { ColorArea, ColorWheel } from '@ui-kit.ai/components'
import { useState } from 'react'

type OnColorChange = NonNullable<ComponentProps<typeof ColorWheel>['onChange']>

export default function ColorWheelWithArea() {
    const [value, setValue] = useState('hsl(240, 60%, 60%)')

    const onChange: OnColorChange = (color) => {
        setValue(color.toString('hsl'))
    }

    return (
        <div className='relative w-48'>
            <ColorWheel
                onChange={onChange}
                value={value}
            />
            <ColorArea
                className='absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2'
                colorSpace='hsb'
                onChange={onChange}
                value={value}
                xChannel='saturation'
                yChannel='brightness'
            />
        </div>
    )
}
