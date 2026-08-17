'use client'

import { ColorWheel } from '@ui-kit.ai/components'

export default function ColorWheelCustomSize() {
    return (
        <div className='flex items-center gap-4'>
            <ColorWheel
                defaultValue='hsl(240, 60%, 60%)'
                innerRadius={30}
                outerRadius={48}
            />
            <ColorWheel
                defaultValue='hsl(240, 60%, 60%)'
                innerRadius={48}
                outerRadius={64}
            />
        </div>
    )
}
