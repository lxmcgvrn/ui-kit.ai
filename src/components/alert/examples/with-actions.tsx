'use client'

import { Alert, Button } from '@ui-kit.ai/components'
import { InfoIcon } from 'lucide-react'

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
            icon={<InfoIcon />}
            text='You do not have any active subscriptions.'
        />
    )
}
