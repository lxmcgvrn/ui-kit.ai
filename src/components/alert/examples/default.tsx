'use client'

import { Alert } from '@ui-kit.ai/components'
import { InfoIcon } from 'lucide-react'

export default function AlertDefault() {
    return (
        <Alert
            icon={<InfoIcon />}
            text='You do not have any active subscriptions.'
        />
    )
}
