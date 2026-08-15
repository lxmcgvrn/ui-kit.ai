'use client'

import { ColorArea } from '@ui-kit.ai/components'

export default function ColorAreaChannels() {
    return (
        <div className='flex flex-wrap items-center gap-4'>
            <ColorArea
                colorSpace='hsb'
                defaultValue='#5B5BD6'
                xChannel='saturation'
                yChannel='brightness'
            />
            <ColorArea
                colorSpace='hsl'
                defaultValue='#5B5BD6'
                xChannel='hue'
                yChannel='lightness'
            />
        </div>
    )
}
