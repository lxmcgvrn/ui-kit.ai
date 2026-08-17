'use client'

import { Alert } from '@ui-kit.ai/components'
import { LucideAlertTriangle } from 'lucide-react'

export default function AlertIntentWarning() {
    return (
        <Alert
            icon={<LucideAlertTriangle />}
            intent='warning'
            text='Your subscription will expire in 3 days.'
        />
    )
}
