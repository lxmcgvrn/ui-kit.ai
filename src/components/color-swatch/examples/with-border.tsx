'use client'

import { ColorSwatch } from '@ui-kit.ai/components'
import { DEFAULT_THEME } from '@ui-kit.ai/theme'

export default function ColorSwatchWithBorder() {
    return (
        <div className='flex items-center gap-2'>
            {Object.entries(DEFAULT_THEME.colors).map(([name, color]) => (
                <ColorSwatch
                    className='border-2 border-black'
                    color={color}
                    key={name}
                />
            ))}
        </div>
    )
}
