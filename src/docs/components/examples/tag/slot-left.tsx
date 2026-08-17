'use client'

import { Tag } from '@ui-kit.ai/components'
import { LucideCircleDot } from 'lucide-react'

const INTENTS = [undefined, 'success', 'warning', 'error'] as const

export default function TagSlotLeft() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {INTENTS.map((intent) => (
        <Tag
          className='capitalize'
          intent={intent}
          key={`${intent ?? 'default'}-default`}
          slotLeft={<LucideCircleDot />}
        >
          {intent ?? 'default'}
        </Tag>
      ))}
      {INTENTS.map((intent) => (
        <Tag
          className='capitalize'
          intent={intent}
          key={`${intent ?? 'default'}-solid`}
          slotLeft={<LucideCircleDot />}
          variant='solid'
        >
          {intent ?? 'default'}
        </Tag>
      ))}
    </div>
  )
}
