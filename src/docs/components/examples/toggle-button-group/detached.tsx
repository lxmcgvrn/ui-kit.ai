'use client'

import { ToggleButton, ToggleButtonGroup } from '@ui-kit.ai/components'

export default function ToggleButtonGroupDetached() {
  return (
    <ToggleButtonGroup
      aria-label='Filters'
      defaultSelectedKeys={['open']}
      isAttached={false}
      selectionMode='multiple'
      variant='tertiary'
    >
      <ToggleButton id='open'>Open</ToggleButton>
      <ToggleButton id='mine'>Assigned to me</ToggleButton>
      <ToggleButton id='draft'>Drafts</ToggleButton>
    </ToggleButtonGroup>
  )
}
