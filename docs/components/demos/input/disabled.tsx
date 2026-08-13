'use client'

import { Input } from '@ui-kit.ai/components'

export default function InputDisabled() {
    return (
        <Input
            aria-disabled
            aria-label='Query'
            placeholder='This is a placeholder'
        />
    )
}
