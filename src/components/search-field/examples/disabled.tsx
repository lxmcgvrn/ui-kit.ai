'use client'

import { FieldGroup, Input, SearchField, SearchFieldClearButton } from '@ui-kit.ai/components'
import { LucideSearch } from 'lucide-react'

export default function SearchFieldDisabled() {
    return (
        <SearchField
            aria-label='Search'
            isDisabled
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
