'use client'

import { Input } from '@ui-kit.ai/components'
import { LucideSearch } from 'lucide-react'

export default function InputIcon() {
    return (
        <Input
            aria-label='Query'
            icon={<LucideSearch />}
            placeholder='This is a placeholder'
        />
    )
}
