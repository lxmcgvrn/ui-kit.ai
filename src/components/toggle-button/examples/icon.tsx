'use client'

import { ToggleButton } from '@ui-kit.ai/components'
import { LucideBold, LucideItalic, LucideUnderline } from 'lucide-react'

export default function ToggleButtonIcon() {
    return (
        <div className='flex gap-2'>
            <ToggleButton
                aria-label='Bold'
                isIcon
            >
                <LucideBold />
            </ToggleButton>
            <ToggleButton
                aria-label='Italic'
                isIcon
            >
                <LucideItalic />
            </ToggleButton>
            <ToggleButton
                aria-label='Underline'
                isIcon
            >
                <LucideUnderline />
            </ToggleButton>
        </div>
    )
}
