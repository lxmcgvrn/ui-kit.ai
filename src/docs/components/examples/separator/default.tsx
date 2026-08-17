'use client'

import { Separator } from '@ui-kit.ai/components'

export default function SeparatorDefault() {
  return (
    <div className='text-lo-contrast w-full text-sm'>
      <p>Everything above the rule.</p>
      <Separator className='my-4' />
      <p>Everything below it.</p>
    </div>
  )
}
