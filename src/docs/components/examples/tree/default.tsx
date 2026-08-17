'use client'

import { Tree, TreeItem } from '@ui-kit.ai/components'

export default function TreeDefault() {
  return (
    <Tree
      aria-label='Files'
      defaultExpandedKeys={['src']}
      selectionMode='single'
    >
      <TreeItem
        id='src'
        textValue='src'
        title='src'
      >
        <TreeItem
          id='components'
          textValue='components'
          title='components'
        >
          <TreeItem
            id='button'
            textValue='button.tsx'
            title='button.tsx'
          />
          <TreeItem
            id='tree'
            textValue='tree.tsx'
            title='tree.tsx'
          />
        </TreeItem>
        <TreeItem
          id='index'
          textValue='index.ts'
          title='index.ts'
        />
      </TreeItem>
      <TreeItem
        id='readme'
        textValue='README.md'
        title='README.md'
      />
    </Tree>
  )
}
