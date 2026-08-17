'use client'

import { Button } from '@ui-kit.ai/components'

export default function ButtonDisabled() {
  return (
    <div className='flex gap-2'>
      <Button
        isDisabled
        variant='primary'
      >
        Primary
      </Button>
      <Button
        isDisabled
        variant='secondary'
      >
        Secondary
      </Button>
      <Button
        isDisabled
        variant='tertiary'
      >
        Tertiary
      </Button>
    </div>
  )
}
