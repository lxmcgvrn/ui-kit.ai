'use client'

import { Alert } from '@ui-kit.ai/components'
import { LucideAlertTriangle } from 'lucide-react'

export default function AlertIntentError() {
    return (
        <Alert
            icon={<LucideAlertTriangle />}
            intent='error'
            text='Your last payment was unsuccessful.'
        />
    )
}
