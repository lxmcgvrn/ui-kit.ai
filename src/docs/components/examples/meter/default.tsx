'use client'

import { Meter } from '@ui-kit.ai/components'

export default function MeterDefault() {
    return (
        <Meter
            label='Storage used'
            value={42}
        />
    )
}
