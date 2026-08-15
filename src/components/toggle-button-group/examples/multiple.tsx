'use client'

import { ToggleButton, ToggleButtonGroup } from '@ui-kit.ai/components'
import { LucideBold, LucideItalic, LucideUnderline } from 'lucide-react'

export default function ToggleButtonGroupMultiple() {
    return (
        <ToggleButtonGroup
            aria-label='Text style'
            defaultSelectedKeys={['bold']}
            selectionMode='multiple'
        >
            <ToggleButton
                aria-label='Bold'
                id='bold'
                isIcon
            >
                <LucideBold />
            </ToggleButton>
            <ToggleButton
                aria-label='Italic'
                id='italic'
                isIcon
            >
                <LucideItalic />
            </ToggleButton>
            <ToggleButton
                aria-label='Underline'
                id='underline'
                isIcon
            >
                <LucideUnderline />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}
