import type { LabelProps as RACLabelProps } from 'react-aria-components'

import { Label as RACLabel } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export interface LabelProps extends RACLabelProps {}

/** A field label, associated with its field automatically. */
export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        'mb-1 block w-fit cursor-default',
        'text-lo-contrast text-sm font-medium',
        'group-invalid:error',
        'group-disabled:cursor-not-allowed group-disabled:opacity-50',
        props.className
      )}
    />
  )
}
Label.displayName = 'Label'
