'use client'

import { ProgressBar } from '@ui-kit.ai/components'

export default function ProgressBarUnlabelled() {
    return (
        <ProgressBar
            aria-label='Uploading'
            value={38}
        />
    )
}
