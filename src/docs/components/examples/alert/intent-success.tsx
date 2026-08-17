'use client'

import { Alert } from '@ui-kit.ai/components'
import { LucideCheckCircle } from 'lucide-react'

export default function AlertIntentSuccess() {
  return (
    <Alert
      icon={<LucideCheckCircle />}
      intent='success'
      text='Your payment was successful.'
    />
  )
}
