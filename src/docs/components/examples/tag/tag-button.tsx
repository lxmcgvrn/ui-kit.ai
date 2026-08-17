'use client'

import { TagButton } from '@ui-kit.ai/components'

const INTENTS = [undefined, 'success', 'warning', 'error'] as const

export default function TagTagButton() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {INTENTS.map((intent) => (
        <TagButton
          className='capitalize'
          intent={intent}
          key={`${intent ?? 'default'}-default`}
        >
          {intent ?? 'default'}
        </TagButton>
      ))}
      {INTENTS.map((intent) => (
        <TagButton
          className='capitalize'
          intent={intent}
          key={`${intent ?? 'default'}-solid`}
          variant='solid'
        >
          {intent ?? 'default'}
        </TagButton>
      ))}
    </div>
  )
}
