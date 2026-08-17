'use client'

import { Button } from '@ui-kit.ai/components'
import { LucideStar } from 'lucide-react'

export default function ButtonSlotRight() {
  return (
    <div className='flex gap-2'>
      <Button
        slotRight={<LucideStar />}
        variant='primary'
      >
        Primary
      </Button>
      <Button
        slotRight={<LucideStar />}
        variant='secondary'
      >
        Secondary
      </Button>
      <Button
        slotRight={<LucideStar />}
        variant='tertiary'
      >
        Tertiary
      </Button>
    </div>
  )
}
