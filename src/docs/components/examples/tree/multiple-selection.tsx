'use client'

import { Tree, TreeItem } from '@ui-kit.ai/components'

export default function TreeMultipleSelection() {
  return (
    <Tree
      aria-label='Permissions'
      defaultExpandedKeys={['billing']}
      defaultSelectedKeys={['invoices']}
      selectionMode='multiple'
    >
      <TreeItem
        id='billing'
        textValue='Billing'
        title='Billing'
      >
        <TreeItem
          id='invoices'
          textValue='Invoices'
          title='Invoices'
        />
        <TreeItem
          id='payouts'
          textValue='Payouts'
          title='Payouts'
        />
      </TreeItem>
      <TreeItem
        id='members'
        textValue='Members'
        title='Members'
      >
        <TreeItem
          id='roles'
          textValue='Roles'
          title='Roles'
        />
      </TreeItem>
    </Tree>
  )
}
