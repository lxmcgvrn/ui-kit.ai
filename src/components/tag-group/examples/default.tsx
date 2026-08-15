'use client'

import { Label, TagGroup, TagGroupItem, TagList } from '@ui-kit.ai/components'

const CUISINES = [
    { id: 'thai', name: 'Thai' },
    { id: 'korean', name: 'Korean' },
    { id: 'sicilian', name: 'Sicilian' },
    { id: 'ethiopian', name: 'Ethiopian' },
]

export default function TagGroupDefault() {
    return (
        <TagGroup selectionMode='multiple'>
            <Label>Cuisines</Label>
            <TagList items={CUISINES}>
                {(cuisine) => <TagGroupItem>{cuisine.name}</TagGroupItem>}
            </TagList>
        </TagGroup>
    )
}
