'use client'

import { Alert } from '@ui-kit.ai/components'
import { AlertTriangleIcon } from 'lucide-react'

export default function AlertIntentWarning() {
    return (
        <Alert
            icon={<AlertTriangleIcon />}
            intent='warning'
            text='Your subscription will expire in 3 days.'
        />
    )
}
