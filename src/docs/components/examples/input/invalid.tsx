'use client'

import { Input } from '@ui-kit.ai/components'

export default function InputInvalid() {
    return (
        <Input
            aria-invalid
            aria-label='Query'
            placeholder='This is a placeholder'
        />
    )
}
