'use client'

import { Alert } from '@ui-kit.ai/components'
import { CheckCircleIcon } from 'lucide-react'

export default function AlertIntentSuccess() {
    return (
        <Alert
            icon={<CheckCircleIcon />}
            intent='success'
            text='Your payment was successful.'
        />
    )
}
