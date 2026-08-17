'use client'

import type { ReactElement } from 'react'

import { Button, DrawerFooter, Tooltip, TooltipTrigger } from '@ui-kit.ai/components'
import { LucideRedo2, LucideRotateCcw, LucideUndo2 } from 'lucide-react'

import type { ThemeEditorController } from './use-theme-input'

import { CopyButton } from './copy-button'

export interface ThemeEditorFooterProps {
    theme: ThemeEditorController
}

interface InertHistoryButtonProps {
    icon: ReactElement
    tooltip: string
}

/** History and reset on the left; CSS and JSON export on the right. */
export function ThemeEditorFooter({ theme }: ThemeEditorFooterProps) {
    return (
        <DrawerFooter>
            <span className='flex items-center gap-2'>
                <InertHistoryButton
                    icon={<LucideUndo2 />}
                    tooltip='Nothing to undo yet'
                />
                <InertHistoryButton
                    icon={<LucideRedo2 />}
                    tooltip='Nothing to redo'
                />

                <TooltipTrigger delay={200}>
                    <Button
                        aria-label='Reset to the shipped theme'
                        isIcon
                        onPress={theme.reset}
                        variant='secondary'
                    >
                        <LucideRotateCcw />
                    </Button>

                    <Tooltip>Reset to the shipped theme</Tooltip>
                </TooltipTrigger>
            </span>

            <span className='flex items-center gap-2'>
                <CopyButton
                    getValue={theme.css}
                    variant='outlined'
                >
                    CSS
                </CopyButton>
                <CopyButton
                    getValue={theme.json}
                    variant='filled'
                >
                    JSON
                </CopyButton>
            </span>
        </DrawerFooter>
    )
}

/* No `disabled`: it blocks hover and focus, hiding the tooltip that explains why. */
function InertHistoryButton({ icon, tooltip }: InertHistoryButtonProps) {
    return (
        <TooltipTrigger delay={200}>
            <Button
                aria-label={tooltip}
                className='cursor-default opacity-50'
                isIcon
                variant='secondary'
            >
                {icon}
            </Button>

            <Tooltip>{tooltip}</Tooltip>
        </TooltipTrigger>
    )
}
