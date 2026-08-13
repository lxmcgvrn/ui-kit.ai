'use client'

import { Button } from '@ui-kit.ai/components'
import { StarIcon } from 'lucide-react'

export default function ButtonSlotRight() {
    return (
        <div className='flex gap-2'>
            <Button
                slotRight={<StarIcon />}
                variant='primary'
            >
                Primary
            </Button>
            <Button
                slotRight={<StarIcon />}
                variant='secondary'
            >
                Secondary
            </Button>
            <Button
                slotRight={<StarIcon />}
                variant='tertiary'
            >
                Tertiary
            </Button>
        </div>
    )
}
