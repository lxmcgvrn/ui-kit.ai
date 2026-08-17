'use client'

import { FieldGroup, Input, SearchField, SearchFieldClearButton } from '@ui-kit.ai/components'
import { LucideSearch } from 'lucide-react'

export default function SearchFieldCustomWidth() {
  return (
    <SearchField
      aria-label='Search'
      className='w-[300px]'
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
