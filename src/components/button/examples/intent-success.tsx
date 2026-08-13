'use client'

import { Button } from '@ui-kit.ai/components'

export default function ButtonIntentSuccess() {
    return (
        <div className='flex gap-2'>
            <Button
                intent='success'
                variant='primary'
            >
                Primary
            </Button>
            <Button
                intent='success'
                variant='secondary'
            >
                Secondary
            </Button>
            <Button
                intent='success'
                variant='tertiary'
            >
                Tertiary
            </Button>
        </div>
    )
}
