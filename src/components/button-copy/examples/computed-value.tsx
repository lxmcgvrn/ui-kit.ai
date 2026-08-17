'use client'

import { ButtonCopy } from '@ui-kit.ai/components'

export default function ButtonCopyComputedValue() {
    return (
        <ButtonCopy
            aria-label='Copy JSON'
            getValue={() => JSON.stringify({ copiedAt: new Date().toISOString() }, null, 2)}
            variant='secondary'
        />
    )
}
