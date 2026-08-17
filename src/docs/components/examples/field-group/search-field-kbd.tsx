'use client'

import { FieldGroup, Input, Kbd, SearchField } from '@ui-kit.ai/components'
import { LucideSearch } from 'lucide-react'

export default function FieldGroupSearchFieldKbd() {
  return (
    <FieldGroup>
      <SearchField aria-label='Search'>
        <Input
          icon={<LucideSearch />}
          isBorderless
          placeholder='Search...'
        />
      </SearchField>
      <Kbd className='mr-1.5'>/</Kbd>
    </FieldGroup>
  )
}
