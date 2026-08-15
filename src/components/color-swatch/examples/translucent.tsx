'use client'

import { ColorSwatch } from '@ui-kit.ai/components'

const ALPHAS = [1, 0.75, 0.5, 0.25, 0.1]

export default function ColorSwatchTranslucent() {
    return (
        <div className='flex items-center gap-2'>
            {ALPHAS.map((alpha) => (
                <ColorSwatch
                    color={`rgba(62, 99, 221, ${alpha.toString()})`}
                    key={alpha}
                />
            ))}
        </div>
    )
}
