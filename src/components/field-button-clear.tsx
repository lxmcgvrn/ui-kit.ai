import { LucideX } from 'lucide-react'
import { composeRenderProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { FieldButton, type FieldButtonProps } from './field-button'
import { Tooltip, TooltipTrigger } from './tooltip'

export interface FieldButtonClearProps extends Omit<FieldButtonProps, 'children' | 'onPress' | 'slot'> {}

/** A `FieldButton` that clears the field. Hidden while the field is empty. */
export function FieldButtonClear(props: FieldButtonClearProps) {
  return (
    <TooltipTrigger delay={0}>
      <FieldButton
        aria-label='Clear'
        {...props}
        className={composeRenderProps(props.className, (className) => twMerge('data-empty:hidden', className))}
        slot='clear'
      >
        <LucideX aria-hidden />
      </FieldButton>

      <Tooltip placement='top'>Clear</Tooltip>
    </TooltipTrigger>
  )
}
FieldButtonClear.displayName = 'FieldButtonClear'
