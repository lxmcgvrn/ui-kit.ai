'use client'

import { ListBox } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'

export default function ListBoxDisabledKeys() {
  return (
    <ListBox
      aria-label='Produce'
      disabledKeys={['carrot', 'spinach']}
      items={getMockOptions<'listbox'>({
        withIcon: true,
        withSections: true,
      })}
      selectionMode='single'
    />
  )
}
