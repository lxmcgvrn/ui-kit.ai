import type { CheckboxGroupProps as RACCheckboxGroupProps } from 'react-aria-components'

import { type ForwardedRef } from 'react'
import { composeRenderProps, CheckboxGroup as RACCheckboxGroup } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export interface CheckboxGroupProps extends RACCheckboxGroupProps {
  ref?: ForwardedRef<HTMLDivElement>
}

/** Lets a user pick more than one option from a list. */
export const CheckboxGroup = ({ ref, ...props }: CheckboxGroupProps) => {
  return (
    <RACCheckboxGroup
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge('group', props.isInvalid === true ? 'error' : '', className))}
      ref={ref}
    >
      {props.children}
    </RACCheckboxGroup>
  )
}
CheckboxGroup.displayName = 'CheckboxGroup'
