'use client'

import { ToggleButton } from '@ui-kit.ai/components'

export default function ToggleButtonDisabled() {
    return (
        <div className='flex gap-2'>
            <ToggleButton isDisabled>Off</ToggleButton>
            <ToggleButton
                defaultSelected
                isDisabled
            >
                On
            </ToggleButton>
        </div>
    )
}
