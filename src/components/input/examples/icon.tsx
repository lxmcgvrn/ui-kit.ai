'use client'

import { Input } from '@ui-kit.ai/components'
import { SearchIcon } from 'lucide-react'

export default function InputIcon() {
    return (
        <Input
            aria-label='Query'
            icon={<SearchIcon />}
            placeholder='This is a placeholder'
        />
    )
}
