'use client'

import { ProgressBar } from '@ui-kit.ai/components'

export default function ProgressBarIndeterminate() {
    return (
        <ProgressBar
            isIndeterminate
            label='Syncing'
        />
    )
}
