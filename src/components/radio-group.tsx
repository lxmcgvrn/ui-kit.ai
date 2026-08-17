import type { ForwardedRef } from 'react'
import type { RadioGroupProps as RACRadioGroupProps, RadioProps as RACRadioProps } from 'react-aria-components'

import { composeRenderProps, Radio as RACRadio, RadioGroup as RACRadioGroup } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Description } from './description'
import { Label } from './label'

export interface RadioGroupProps extends RACRadioGroupProps {
  ref?: ForwardedRef<HTMLDivElement>
}

/** Lets a user pick a single option from a list. */
export const RadioGroup = ({ ref, ...props }: RadioGroupProps) => {
  return (
    <RACRadioGroup
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge('group', props.isInvalid === true ? 'error' : '', className))}
      ref={ref}
    >
      {props.children}
    </RACRadioGroup>
  )
}
RadioGroup.displayName = 'RadioGroup'

export type RadioProps = Omit<RACRadioProps, 'children'> &
  (
    | {
        description?: string
        label: string
        textPosition?: 'left' | 'right'
      }
    | {
        description?: string
        label?: never
        textPosition?: never
      }
  )

const radioContainerStyles = tv({
  base: [
    'flex gap-3',
    'items-center',
    '-mx-1 px-1',
    'rounded-sm transition',
    'group',
    '[[role=radiogroup]_&]:mb-1',
    '[[role=radiogroup]_&]:last-of-type:mb-2',
    'hover:cursor-pointer disabled:cursor-not-allowed',
    'invalid:error',
  ],
})

const circleStyles = tv({
  base: [
    'bg-base',
    'border-field border',
    'size-4',
    'transition-colors',
    'flex flex-shrink-0 items-center justify-center',
    'rounded-full',
    // disabled
    'group-disabled:opacity-50',
    // hover
    'group-hover:bg-tint',
    'group-hover:border-field-hover',
    // checked
    'group-selected:surface-primary',
  ],
})

const dotStyles = tv({
  base: [
    'size-1.5',
    'rounded-full',
    'transition-colors',
    'bg-transparent',
    // hover
    'group-hover:bg-[var(--theme-default-text-lo-contrast)]',
    // checked
    'group-selected:bg-[var(--theme-default-text-accent)]',
  ],
})

/** A single option within a {@link RadioGroup}. */
export function Radio({ description, label, textPosition = 'right', ...props }: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        radioContainerStyles({
          ...renderProps,
          className,
        })
      )}
    >
      {textPosition === 'left' && label != null ? (
        <RadioLabel
          description={description}
          label={label}
        />
      ) : null}

      <div className={circleStyles()}>
        <div className={dotStyles()} />
      </div>

      {textPosition === 'right' && label != null ? (
        <RadioLabel
          description={description}
          label={label}
        />
      ) : null}
    </RACRadio>
  )
}
Radio.displayName = 'Radio'

function RadioLabel({ description, label }: { description?: string; label: string }) {
  return (
    <div>
      <Label className='text-hi-contrast mb-0 flex items-center gap-1'>{label}</Label>
      {description != null ? <Description className='!mt-0'>{description}</Description> : null}
    </div>
  )
}
RadioLabel.displayName = 'RadioLabel'
