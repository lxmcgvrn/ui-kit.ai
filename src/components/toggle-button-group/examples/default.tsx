'use client'

import { ToggleButton, ToggleButtonGroup } from '@ui-kit.ai/components'

export default function ToggleButtonGroupDefault() {
    return (
        <ToggleButtonGroup
            aria-label='Text alignment'
            defaultSelectedKeys={['left']}
            disallowEmptySelection
        >
            <ToggleButton id='left'>Left</ToggleButton>
            <ToggleButton id='center'>Center</ToggleButton>
            <ToggleButton id='right'>Right</ToggleButton>
        </ToggleButtonGroup>
    )
}
