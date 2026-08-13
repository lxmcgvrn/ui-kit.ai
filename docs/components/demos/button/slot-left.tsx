'use client'

import { Button } from '@ui-kit.ai/components'
import { StarIcon } from 'lucide-react'

export default function ButtonSlotLeft() {
    return (
        <div className='flex gap-2'>
            <Button
                slotLeft={<StarIcon />}
                variant='primary'
            >
                Primary
            </Button>
            <Button
                slotLeft={<StarIcon />}
                variant='secondary'
            >
                Secondary
            </Button>
            <Button
                slotLeft={<StarIcon />}
                variant='tertiary'
            >
                Tertiary
            </Button>
        </div>
    )
}
