'use client'

import type { ComponentProps } from 'react'

import { ColorPicker } from '@ui-kit.ai/components'
import { useState } from 'react'

type OnColorChange = NonNullable<ComponentProps<typeof ColorPicker>['onChange']>

export default function ColorPickerControlled() {
    const [value, setValue] = useState('#5B5BD6')

    const onChange: OnColorChange = (color) => {
        setValue(color.toString('hexa'))
    }

    return (
        <div className='flex items-center gap-4'>
            <ColorPicker
                onChange={onChange}
                value={value}
            />
            <span className='text-lo-contrast text-sm'>{value}</span>
        </div>
    )
}
