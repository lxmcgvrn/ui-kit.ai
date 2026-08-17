'use client'

import { FieldGroup, Input, SearchField, SearchFieldClearButton } from '@ui-kit.ai/components'
import { LucideSearch } from 'lucide-react'

export default function SearchFieldReadOnly() {
  return (
    <SearchField
      aria-label='Search'
      defaultValue='Read only search field'
      isReadOnly
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
