'use client'

import { ColorSwatch } from '@ui-kit.ai/components'

import { PALETTE } from './palette'

export default function ColorSwatchWithBorder() {
    return (
        <div className='flex items-center gap-2'>
            {PALETTE.map((color) => (
                <ColorSwatch
                    className='border-2 border-black'
                    color={color}
                    key={color}
                />
            ))}
        </div>
    )
}
