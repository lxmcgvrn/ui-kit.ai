import type { ComponentProps } from 'react'

import { composeRenderProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Button } from './button'

export interface FieldButtonProps extends Omit<ComponentProps<typeof Button>, 'isIcon' | 'variant'> {
  /** Field buttons sit outside the tab order. Set `false` to give one a tab stop. */
  excludeFromTabOrder?: boolean
}

/** An icon button for use inside a `FieldGroup`. */
export function FieldButton({ excludeFromTabOrder = true, ...props }: FieldButtonProps) {
  return (
    <Button
      isIcon
      variant='tertiary'
      {...props}
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          '!size-6',
          'align-middle',
          'text-placeholder',
          'group-invalid:error',
          'last-of-type:mr-1 [&:not(:last-of-type)]:mr-px',
          '[&_svg]:size-3 [&_svg]:shrink-0',
          className
        )
      )}
      excludeFromTabOrder={excludeFromTabOrder}
    />
  )
}
FieldButton.displayName = 'FieldButton'
