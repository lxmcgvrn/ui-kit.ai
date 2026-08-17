'use client'

import { GridList, GridListItem } from '@ui-kit.ai/components'

const FILES = [
  { id: 'readme', name: 'README.md' },
  { id: 'license', name: 'LICENSE.md' },
  { id: 'changelog', name: 'CHANGELOG.md' },
  { id: 'contributing', name: 'CONTRIBUTING.md' },
]

export default function GridListDefault() {
  return (
    <GridList
      aria-label='Files'
      items={FILES}
      selectionMode='single'
    >
      {(file) => <GridListItem>{file.name}</GridListItem>}
    </GridList>
  )
}
