'use client'

import { ToggleButton } from '@ui-kit.ai/components'

export default function ToggleButtonVariants() {
    return (
        <div className='flex gap-2'>
            <ToggleButton
                defaultSelected
                variant='primary'
            >
                Primary
            </ToggleButton>
            <ToggleButton variant='primary'>Primary</ToggleButton>

            <ToggleButton
                defaultSelected
                variant='secondary'
            >
                Secondary
            </ToggleButton>
            <ToggleButton variant='secondary'>Secondary</ToggleButton>

            <ToggleButton
                defaultSelected
                variant='tertiary'
            >
                Tertiary
            </ToggleButton>
            <ToggleButton variant='tertiary'>Tertiary</ToggleButton>
        </div>
    )
}
