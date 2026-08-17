'use client'

import { Alert } from '@ui-kit.ai/components'
import { LucideInfo } from 'lucide-react'

export default function AlertDefault() {
  return (
    <Alert
      icon={<LucideInfo />}
      text='You do not have any active subscriptions.'
    />
  )
}
