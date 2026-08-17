'use client'

import { Button } from '@ui-kit.ai/components'
import { LucidePalette } from 'lucide-react'

import { openThemeEditor } from './store'

/** MDX-facing trigger: a labelled button that opens the drawer. */
export function ButtonThemeEditor() {
    return (
        <Button
            className='not-prose w-fit'
            onPress={openThemeEditor}
            slotLeft={<LucidePalette />}
            variant='secondary'
        >
            Open the theme editor
        </Button>
    )
}

/** The persistent palette button rendered in the site nav. */
export function ButtonThemeEditorNav() {
    return (
        <Button
            aria-label='Open the theme editor'
            className='ms-1'
            isIcon
            onPress={openThemeEditor}
            variant='tertiary'
        >
            <LucidePalette />
        </Button>
    )
}
