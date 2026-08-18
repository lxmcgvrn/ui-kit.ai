import type { PressEvent as RACPressEvent } from 'react-aria-components'

import { LucideCheck, LucideClipboard } from 'lucide-react'
import { ButtonContext as RACButtonContext, useSlottedContext } from 'react-aria-components'

import { AnimatedIconContainer } from './animated-icon-container'
import { FieldButton, type FieldButtonProps } from './field-button'
import { useCopyConfirmation } from './hooks/use-copy-confirmation'
import { Tooltip, TooltipTrigger } from './tooltip'

export interface FieldButtonCopyProps extends Omit<FieldButtonProps, 'children' | 'onPress' | 'slot'> {}

/** A `FieldButton` that copies the field's value, confirming with a check. */
export function FieldButtonCopy(props: FieldButtonCopyProps) {
  const context = useSlottedContext(RACButtonContext, 'copy')
  const { confirmCopy, hasCopied } = useCopyConfirmation()

  const onPress = async (event: RACPressEvent) => {
    try {
      await Promise.resolve(context?.onPress?.(event))
    } catch {
      return
    }

    confirmCopy()
  }

  return (
    <TooltipTrigger delay={0}>
      <FieldButton
        aria-label='Copy to clipboard'
        {...props}
        isDisabled={props.isDisabled ?? context?.isDisabled}
        onPress={(event) => void onPress(event)}
        slot={null}
      >
        <AnimatedIconContainer>{hasCopied ? <LucideCheck /> : <LucideClipboard />}</AnimatedIconContainer>
      </FieldButton>

      <Tooltip placement='top'>{hasCopied ? 'Copied' : 'Copy to clipboard'}</Tooltip>
    </TooltipTrigger>
  )
}
FieldButtonCopy.displayName = 'FieldButtonCopy'
