'use client'

import { Button } from '@ui-kit.ai/components'
import { LucideStar } from 'lucide-react'

export default function ButtonSlotLeft() {
  return (
    <div className='flex gap-2'>
      <Button
        slotLeft={<LucideStar />}
        variant='primary'
      >
        Primary
      </Button>
      <Button
        slotLeft={<LucideStar />}
        variant='secondary'
      >
        Secondary
      </Button>
      <Button
        slotLeft={<LucideStar />}
        variant='tertiary'
      >
        Tertiary
      </Button>
    </div>
  )
}
