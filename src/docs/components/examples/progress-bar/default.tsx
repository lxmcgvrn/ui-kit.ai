'use client'

import { ProgressBar } from '@ui-kit.ai/components'

export default function ProgressBarDefault() {
    return (
        <ProgressBar
            label='Uploading'
            value={64}
        />
    )
}
