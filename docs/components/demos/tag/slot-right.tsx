'use client'

import { Tag } from '@ui-kit.ai/components'
import { CircleDot } from 'lucide-react'

const INTENTS = [undefined, 'success', 'warning', 'error'] as const

export default function TagSlotRight() {
    return (
        <div className='grid grid-cols-4 gap-4'>
            {INTENTS.map((intent) => (
                <Tag
                    className='capitalize'
                    intent={intent}
                    key={`${intent}-default`}
                    slotRight={<CircleDot />}
                >
                    {intent ?? 'default'}
                </Tag>
            ))}
            {INTENTS.map((intent) => (
                <Tag
                    className='capitalize'
                    intent={intent}
                    key={`${intent}-solid`}
                    slotRight={<CircleDot />}
                    variant='solid'
                >
                    {intent ?? 'default'}
                </Tag>
            ))}
        </div>
    )
}
