'use client'

import { Tag } from '@ui-kit.ai/components'

const INTENTS = [undefined, 'success', 'warning', 'error'] as const

export default function TagDefault() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {INTENTS.map((intent) => (
        <Tag
          className='capitalize'
          intent={intent}
          key={`${intent ?? 'default'}-default`}
        >
          {intent ?? 'default'}
        </Tag>
      ))}
      {INTENTS.map((intent) => (
        <Tag
          className='capitalize'
          intent={intent}
          key={`${intent ?? 'default'}-solid`}
          variant='solid'
        >
          {intent ?? 'default'}
        </Tag>
      ))}
    </div>
  )
}
