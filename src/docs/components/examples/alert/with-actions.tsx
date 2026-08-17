'use client'

import { Alert, Button } from '@ui-kit.ai/components'
import { LucideInfo } from 'lucide-react'

export default function AlertWithActions() {
  return (
    <Alert
      actions={[
        <Button
          key='secondary'
          variant='secondary'
        >
          Secondary
        </Button>,
        <Button
          key='primary'
          variant='primary'
        >
          Primary
        </Button>,
      ]}
      icon={<LucideInfo />}
      text='You do not have any active subscriptions.'
    />
  )
}
