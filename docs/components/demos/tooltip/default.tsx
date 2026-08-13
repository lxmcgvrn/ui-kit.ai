'use client'

import { Tooltip, TooltipInfoButton, TooltipTrigger } from '@ui-kit.ai/components'

export default function TooltipDefault() {
    return (
        <TooltipTrigger defaultOpen>
            <TooltipInfoButton />
            <Tooltip placement='top'>This is the tooltip</Tooltip>
        </TooltipTrigger>
    )
}
