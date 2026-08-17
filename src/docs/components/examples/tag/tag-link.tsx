'use client'

import { TagLink } from '@ui-kit.ai/components'

const INTENTS = [undefined, 'success', 'warning', 'error'] as const

export default function TagTagLink() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {INTENTS.map((intent) => (
        <TagLink
          className='capitalize'
          intent={intent}
          key={`${intent ?? 'default'}-default`}
        >
          {intent ?? 'default'}
        </TagLink>
      ))}
      {INTENTS.map((intent) => (
        <TagLink
          className='capitalize'
          intent={intent}
          key={`${intent ?? 'default'}-solid`}
          variant='solid'
        >
          {intent ?? 'default'}
        </TagLink>
      ))}
    </div>
  )
}
