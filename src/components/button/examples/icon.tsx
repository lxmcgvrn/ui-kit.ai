'use client'

import { Button } from '@ui-kit.ai/components'
import { StarIcon } from 'lucide-react'

export default function ButtonIcon() {
    return (
        <div className='flex gap-2'>
            <Button
                aria-label='button'
                isIcon
                variant='primary'
            >
                <StarIcon />
            </Button>
            <Button
                aria-label='button'
                isIcon
                variant='secondary'
            >
                <StarIcon />
            </Button>
            <Button
                aria-label='button'
                isIcon
                variant='tertiary'
            >
                <StarIcon />
            </Button>
        </div>
    )
}
