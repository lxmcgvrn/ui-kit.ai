'use client'

import { Button } from '@ui-kit.ai/components'

export default function ButtonDefault() {
  return (
    <div className='flex gap-2'>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='tertiary'>Tertiary</Button>
    </div>
  )
}
