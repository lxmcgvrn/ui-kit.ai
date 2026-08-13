'use client'

import { Alert } from '@ui-kit.ai/components'
import { AlertTriangleIcon } from 'lucide-react'

export default function AlertIntentError() {
    return (
        <Alert
            icon={<AlertTriangleIcon />}
            intent='error'
            text='Your last payment was unsuccessful.'
        />
    )
}
