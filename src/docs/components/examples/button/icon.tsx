'use client'

import { Button } from '@ui-kit.ai/components'
import { LucideStar } from 'lucide-react'

export default function ButtonIcon() {
  return (
    <div className='flex gap-2'>
      <Button
        aria-label='button'
        isIcon
        variant='primary'
      >
        <LucideStar />
      </Button>
      <Button
        aria-label='button'
        isIcon
        variant='secondary'
      >
        <LucideStar />
      </Button>
      <Button
        aria-label='button'
        isIcon
        variant='tertiary'
      >
        <LucideStar />
      </Button>
    </div>
  )
}
