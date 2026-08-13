'use client'

import { Button, Kbd, Tooltip, TooltipTrigger } from '@ui-kit.ai/components'
import { PlusIcon } from 'lucide-react'

export default function KbdInTooltip() {
    return (
        <TooltipTrigger>
            <Button
                aria-label='Create'
                isIcon
            >
                <PlusIcon />
            </Button>
            <Tooltip
                isOpen
                placement='right'
            >
                Create
                <Kbd>C</Kbd>
            </Tooltip>
        </TooltipTrigger>
    )
}
