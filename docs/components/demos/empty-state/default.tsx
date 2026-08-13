'use client'

import { Button, EmptyState } from '@ui-kit.ai/components'
import { SearchXIcon } from 'lucide-react'

export default function EmptyStateDefault() {
    return (
        <EmptyState
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
            body='This is the body'
            icon={<SearchXIcon />}
            title='This is the title'
        />
    )
}
