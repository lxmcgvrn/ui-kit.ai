'use client'

import { Button, Separator, ToggleButton, Toolbar } from '@ui-kit.ai/components'
import { LucideBold, LucideItalic, LucideLink, LucideUnderline, LucideUndo2 } from 'lucide-react'

export default function ToolbarDefault() {
    return (
        <Toolbar aria-label='Text formatting'>
            <ToggleButton
                aria-label='Bold'
                isIcon
                variant='tertiary'
            >
                <LucideBold />
            </ToggleButton>
            <ToggleButton
                aria-label='Italic'
                isIcon
                variant='tertiary'
            >
                <LucideItalic />
            </ToggleButton>
            <ToggleButton
                aria-label='Underline'
                isIcon
                variant='tertiary'
            >
                <LucideUnderline />
            </ToggleButton>

            <Separator orientation='vertical' />

            <Button
                aria-label='Insert link'
                isIcon
                variant='tertiary'
            >
                <LucideLink />
            </Button>
            <Button
                aria-label='Undo'
                isIcon
                variant='tertiary'
            >
                <LucideUndo2 />
            </Button>
        </Toolbar>
    )
}
