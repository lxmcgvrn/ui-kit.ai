'use client'

import { Button } from '@ui-kit.ai/components'

export default function ButtonIntentWarning() {
  return (
    <div className='flex gap-2'>
      <Button
        intent='warning'
        variant='primary'
      >
        Primary
      </Button>
      <Button
        intent='warning'
        variant='secondary'
      >
        Secondary
      </Button>
      <Button
        intent='warning'
        variant='tertiary'
      >
        Tertiary
      </Button>
    </div>
  )
}
