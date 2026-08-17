'use client'

import { Label, TagGroup, TagGroupItem, TagList } from '@ui-kit.ai/components'
import { useState } from 'react'

const FILTERS = [
  { id: 'in-stock', name: 'In stock' },
  { id: 'free-shipping', name: 'Free shipping' },
  { id: 'on-sale', name: 'On sale' },
]

export default function TagGroupRemovable() {
  const [filters, setFilters] = useState(FILTERS)

  return (
    <TagGroup
      onRemove={(keys) => {
        setFilters((current) => current.filter((filter) => !keys.has(filter.id)))
      }}
    >
      <Label>Filters</Label>
      <TagList
        items={filters}
        renderEmptyState={() => 'No filters applied.'}
      >
        {(filter) => <TagGroupItem>{filter.name}</TagGroupItem>}
      </TagList>
    </TagGroup>
  )
}
