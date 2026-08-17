'use client'

import { Button } from '@ui-kit.ai/components'

export default function ButtonIntentError() {
  return (
    <div className='flex gap-2'>
      <Button
        intent='error'
        variant='primary'
      >
        Primary
      </Button>
      <Button
        intent='error'
        variant='secondary'
      >
        Secondary
      </Button>
      <Button
        intent='error'
        variant='tertiary'
      >
        Tertiary
      </Button>
    </div>
  )
}
