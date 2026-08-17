'use client'

import { Switch } from '@ui-kit.ai/components'

export default function SwitchIsDisabled() {
    return (
        <Switch
            defaultSelected
            isDisabled
            label='This is the label'
        />
    )
}
