import type { Tooltip, TooltipInfoButton, TooltipTrigger } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has named, exported types to document —
 * the component package only exports the components themselves.
 */
export type TooltipInfoButtonProps = ComponentProps<typeof TooltipInfoButton>

export type TooltipProps = ComponentProps<typeof Tooltip>

export type TooltipTriggerProps = ComponentProps<typeof TooltipTrigger>
