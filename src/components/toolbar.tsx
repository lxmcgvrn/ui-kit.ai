import type { ForwardedRef } from 'react'
import type { ToolbarProps as RACToolbarProps } from 'react-aria-components'

import { composeRenderProps, Toolbar as RACToolbar } from 'react-aria-components'
import { tv } from 'tailwind-variants'

const toolbarStyles = tv({
  base: [
    'flex gap-1',
    'orientation-horizontal:flex-row orientation-horizontal:items-center',
    'orientation-vertical:w-fit orientation-vertical:flex-col orientation-vertical:items-stretch',
  ],
})

export interface ToolbarProps extends RACToolbarProps {
  ref?: ForwardedRef<HTMLDivElement>
}

/** Groups related controls, moving focus between them with the arrow keys. */
export function Toolbar({ ref, ...props }: ToolbarProps) {
  return (
    <RACToolbar
      {...props}
      className={composeRenderProps(props.className, (className) =>
        toolbarStyles({
          className,
        })
      )}
      ref={ref}
    />
  )
}
Toolbar.displayName = 'Toolbar'
