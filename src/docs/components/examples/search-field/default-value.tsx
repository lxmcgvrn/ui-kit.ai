'use client'

import { FieldGroup, Input, SearchField, SearchFieldClearButton } from '@ui-kit.ai/components'
import { LucideSearch } from 'lucide-react'

export default function SearchFieldDefaultValue() {
    return (
        <SearchField
            aria-label='Search'
            defaultValue='Initial search term'
        >
            <FieldGroup>
                <Input
                    icon={<LucideSearch />}
                    isBorderless
                    placeholder='Search...'
                />
                <SearchFieldClearButton />
            </FieldGroup>
        </SearchField>
    )
}
