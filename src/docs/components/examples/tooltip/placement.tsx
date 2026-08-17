'use client'

import type { ComponentProps, ComponentType } from 'react'

import { Button, Tooltip, TooltipTrigger } from '@ui-kit.ai/components'
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

type Placement = ComponentProps<typeof Tooltip>['placement']

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

export default function TooltipPlacement() {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {PLACEMENTS.map((placement) =>
        placement === null ? (
          <div key='center' />
        ) : (
          <TooltipTrigger key={placement}>
            <Button
              isIcon
              variant='secondary'
            >
              <PlacementIcon placement={placement} />
            </Button>
            <Tooltip placement={placement}>{placement}</Tooltip>
          </TooltipTrigger>
        )
      )}
    </div>
  )
}

function PlacementIcon({ placement }: { placement: KnownPlacement }) {
  const Icon = PLACEMENT_ICONS[placement]
  return <Icon className='h-4 w-4' />
}
