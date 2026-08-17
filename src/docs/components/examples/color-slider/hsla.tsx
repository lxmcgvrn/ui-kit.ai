'use client'

import { ColorSlider } from '@ui-kit.ai/components'

export default function ColorSliderHsla() {
    return (
        <div className='flex w-full flex-col gap-4'>
            <ColorSlider
                channel='hue'
                defaultValue='hsl(240, 60%, 60%)'
            />
            <ColorSlider
                channel='saturation'
                defaultValue='hsl(240, 60%, 60%)'
            />
            <ColorSlider
                channel='lightness'
                defaultValue='hsl(240, 60%, 60%)'
            />
            <ColorSlider
                channel='alpha'
                defaultValue='hsl(240, 60%, 60%)'
            />
        </div>
    )
}
