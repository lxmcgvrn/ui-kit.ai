'use client'

import { Button, Tooltip, TooltipTrigger } from '@ui-kit.ai/components'
import { LucideInfo } from 'lucide-react'

export interface ContrastIconProps {
    /** The complaint, verbatim from the engine's warning. */
    message: string
}

/** Flags a colour that missed its contrast target, and says so on hover. */
export function ContrastIcon({ message }: ContrastIconProps) {
    return (
        <TooltipTrigger>
            <Button
                aria-label='Contrast warning'
                intent='error'
                isIcon
                variant='tertiary'
            >
                <LucideInfo />
            </Button>

            <Tooltip>
                {/* The warning is a sentence, so it wraps instead of running off. */}
                <span className='block max-w-64'>{message}</span>
            </Tooltip>
        </TooltipTrigger>
    )
}
