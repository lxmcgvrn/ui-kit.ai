import type { SwitchProps as RACSwitchProps } from 'react-aria-components'

import { composeRenderProps, Switch as RACSwitch } from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { Description } from './description'
import { Label } from './label'

export type SwitchProps = Omit<RACSwitchProps, 'children'> & {
  /** Applies the error styling. RAC's `Switch` has no validation of its own. */
  isInvalid?: boolean
} & (
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

const switchContainerStyles = tv({
  base: ['flex gap-3', 'items-center', '-mx-1 px-1', 'rounded-sm transition', 'group', 'hover:cursor-pointer disabled:cursor-not-allowed'],
  variants: {
    isInvalid: {
      true: 'error',
    },
  },
})

const trackStyles = tv({
  base: [
    'bg-tint',
    'h-4 w-7',
    'px-0.5',
    'transition-colors',
    'flex flex-shrink-0 items-center',
    'rounded-full',
    // disabled
    'group-disabled:opacity-50',
    // checked
    'group-selected:surface-primary',
  ],
})

const thumbStyles = tv({
  base: [
    'size-3',
    'rounded-full',
    'transition',
    'bg-[var(--theme-default-text-lo-contrast)]',
    // hover
    'group-hover:bg-[var(--theme-default-text-hi-contrast)]',
    // checked
    'group-selected:translate-x-3',
    'group-selected:bg-[var(--theme-default-text-accent)]',
  ],
})

/** Toggles a single value on or off. */
export function Switch({ description, isInvalid, label, textPosition = 'right', ...props }: SwitchProps) {
  return (
    <RACSwitch
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        switchContainerStyles({
          ...renderProps,
          className,
          isInvalid,
        })
      )}
    >
      {textPosition === 'left' && label != null ? (
        <SwitchLabel
          description={description}
          label={label}
        />
      ) : null}

      <div className={trackStyles()}>
        <div className={thumbStyles()} />
      </div>

      {textPosition === 'right' && label != null ? (
        <SwitchLabel
          description={description}
          label={label}
        />
      ) : null}
    </RACSwitch>
  )
}
Switch.displayName = 'Switch'

function SwitchLabel({ description, label }: { description?: string; label: string }) {
  return (
    <div>
      <Label className='text-hi-contrast mb-0 flex items-center gap-1'>{label}</Label>
      {description != null ? <Description className='!mt-0'>{description}</Description> : null}
    </div>
  )
}
SwitchLabel.displayName = 'SwitchLabel'
