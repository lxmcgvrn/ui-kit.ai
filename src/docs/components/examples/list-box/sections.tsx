'use client'

import { ListBox } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'

export default function ListBoxSections() {
  return (
    <ListBox
      aria-label='Produce'
      items={getMockOptions<'listbox'>({
        withIcon: true,
        withSections: true,
      })}
      selectionMode='single'
    />
  )
}
