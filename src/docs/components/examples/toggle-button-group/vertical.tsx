'use client'

import { ToggleButton, ToggleButtonGroup } from '@ui-kit.ai/components'

export default function ToggleButtonGroupVertical() {
    return (
        <ToggleButtonGroup
            aria-label='Density'
            defaultSelectedKeys={['comfortable']}
            disallowEmptySelection
            orientation='vertical'
        >
            <ToggleButton id='compact'>Compact</ToggleButton>
            <ToggleButton id='comfortable'>Comfortable</ToggleButton>
            <ToggleButton id='spacious'>Spacious</ToggleButton>
        </ToggleButtonGroup>
    )
}
