'use client'

import type { ComponentProps, ComponentType } from 'react'

import { Button, DialogTrigger, Heading, Popover, PopoverDialog } from '@ui-kit.ai/components'
import {
    LucideArrowUp,
    LucideArrowUpLeft,
    LucideArrowUpRight,
    LucideMoveDown,
    LucideMoveDownLeft,
    LucideMoveDownRight,
    LucideMoveLeft,
    LucideMoveRight,
} from 'lucide-react'

type Placement = Exclude<ComponentProps<typeof Popover>['placement'], undefined>

const PLACEMENTS = [
    'top left',
    'top',
    'top right',
    'left',
    null,
    'right',
    'bottom left',
    'bottom',
    'bottom right',
] as const satisfies (null | Placement)[]

type KnownPlacement = Exclude<(typeof PLACEMENTS)[number], null>

const PLACEMENT_ICONS = {
    bottom: LucideMoveDown,
    'bottom left': LucideMoveDownLeft,
    'bottom right': LucideMoveDownRight,
    left: LucideMoveLeft,
    right: LucideMoveRight,
    top: LucideArrowUp,
    'top left': LucideArrowUpLeft,
    'top right': LucideArrowUpRight,
} satisfies Record<KnownPlacement, ComponentType>

export default function PopoverPlacement() {
    return (
        <div className='grid grid-cols-3 gap-2'>
            {PLACEMENTS.map((placement) =>
                placement === null ? (
                    <div key='center' />
                ) : (
                    <DialogTrigger key={placement}>
                        <Button
                            isIcon
                            variant='secondary'
                        >
                            <PlacementIcon placement={placement} />
                        </Button>
                        <Popover placement={placement}>
                            <HelpDialog />
                        </Popover>
                    </DialogTrigger>
                )
            )}
        </div>
    )
}

function HelpDialog() {
    return (
        <PopoverDialog>
            <Heading
                className='mb-2 text-base'
                level={3}
                slot='title'
            >
                Help
            </Heading>
            <p className='text-sm'>For help accessing your account, please contact support.</p>
        </PopoverDialog>
    )
}

function PlacementIcon({ placement }: { placement: KnownPlacement }) {
    const Icon = PLACEMENT_ICONS[placement]
    return <Icon className='h-4 w-4' />
}
