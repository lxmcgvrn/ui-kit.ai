'use client'

import { ButtonCopy } from '@ui-kit.ai/components'

export default function ButtonCopyDefault() {
    return (
        <ButtonCopy
            aria-label='Copy install command'
            getValue={() => 'npm install @ui-kit.ai/components'}
        />
    )
}
