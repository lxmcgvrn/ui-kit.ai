import type { ForwardedRef } from 'react'
import type { FileTriggerProps as RACFileTriggerProps } from 'react-aria-components'

import { FileTrigger as RACFileTrigger } from 'react-aria-components'

export interface FileTriggerProps extends RACFileTriggerProps {
  /** A pressable element — typically a `Button` — that opens the file picker. */
  children?: RACFileTriggerProps['children']

  /** A ref forwarded to the underlying `&lt;input type="file" />` element. */
  ref?: ForwardedRef<HTMLInputElement>
}

/** Opens the file picker when the user presses the element it wraps. */
export function FileTrigger({ ref, ...props }: FileTriggerProps) {
  return (
    <RACFileTrigger
      {...props}
      ref={ref}
    />
  )
}
FileTrigger.displayName = 'FileTrigger'
