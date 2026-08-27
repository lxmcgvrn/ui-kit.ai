'use client'

import { Tree, TreeItem } from '@ui-kit.ai/components'

export default function TreeExpandIconRight() {
  return (
    <Tree
      aria-label='Files'
      defaultExpandedKeys={['src']}
      expandIconPosition='right'
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
