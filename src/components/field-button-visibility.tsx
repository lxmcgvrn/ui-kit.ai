import { LucideEye, LucideEyeOff } from 'lucide-react'
import { ButtonContext as RACButtonContext, useSlottedContext } from 'react-aria-components'

import { AnimatedIconContainer } from './animated-icon-container'
import { FieldButton, type FieldButtonProps } from './field-button'
import { Tooltip, TooltipTrigger } from './tooltip'

export interface FieldButtonVisibilityProps extends Omit<FieldButtonProps, 'children' | 'slot'> {}

/** A `FieldButton` that toggles whether the field's value reads as plain text. */
export function FieldButtonVisibility(props: FieldButtonVisibilityProps) {
  const context = useSlottedContext(RACButtonContext, 'visibility')
  const isValueHidden = context?.value === 'hidden'

  return (
    <TooltipTrigger delay={0}>
      <FieldButton
        aria-label={isValueHidden ? 'Show' : 'Hide'}
        {...props}
        slot='visibility'
      >
        <AnimatedIconContainer>{isValueHidden ? <LucideEyeOff /> : <LucideEye />}</AnimatedIconContainer>
      </FieldButton>

      <Tooltip placement='top'>{isValueHidden ? 'Show' : 'Hide'}</Tooltip>
    </TooltipTrigger>
  )
}
FieldButtonVisibility.displayName = 'FieldButtonVisibility'
