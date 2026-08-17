'use client'

import { Tree, TreeItem } from '@ui-kit.ai/components'
import { LucideFolder } from 'lucide-react'
import { Collection as RACCollection } from 'react-aria-components'

interface Node {
  children?: Node[]
  id: string
  name: string
}

const NODES: Node[] = [
  {
    children: [
      { id: 'annual-report', name: 'Annual report' },
      {
        children: [{ id: 'q4', name: 'Q4' }],
        id: 'forecasts',
        name: 'Forecasts',
      },
    ],
    id: 'documents',
    name: 'Documents',
  },
  { id: 'archive', name: 'Archive' },
]

export default function TreeDynamic() {
  return (
    <Tree
      aria-label='Folders'
      defaultExpandedKeys={['documents']}
      items={NODES}
      selectionMode='single'
    >
      {(node: Node) => <NodeItem node={node} />}
    </Tree>
  )
}

function NodeItem({ node }: { node: Node }) {
  return (
    <TreeItem
      textValue={node.name}
      title={
        <span className='flex items-center gap-1.5'>
          <LucideFolder
            aria-hidden
            className='text-lo-contrast size-3'
          />
          {node.name}
        </span>
      }
    >
      <RACCollection items={node.children ?? []}>{(child: Node) => <NodeItem node={child} />}</RACCollection>
    </TreeItem>
  )
}
