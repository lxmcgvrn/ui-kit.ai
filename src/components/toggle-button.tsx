import type { ForwardedRef } from 'react'
import type { ToggleButtonProps as RACToggleButtonProps } from 'react-aria-components'

import { use } from 'react'
import { composeRenderProps, ToggleButton as RACToggleButton } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { ToggleButtonVariant } from './toggle-button-group'
import type { Intent } from './types/intent'

import { ToggleGroupStyleContext } from './toggle-button-group'
import { renderSlot, Slot, type SlotNode } from './types/slotted-node'

/** Matches `Button`, with the resting look reserved for the unselected state. */
const toggleButtonStyles = tv({
  base: [
    'rounded-sm',
    'border',
    'inline-flex shrink-0 items-center justify-center gap-1.5',
    'h-ui-element',
    'text-center text-sm font-medium',
    'cursor-pointer',
    'transition-colors',
    'px-4 py-2',
    '[&:has([data-slot=slot-left])]:pl-3',
    '[&:has([data-slot=slot-right])]:pr-3',
    '[&_svg]:size-3 [&_svg]:shrink-0',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  compoundVariants: [
    {
      class: 'surface-primary',
      isSelected: false,
      variant: 'primary',
    },
    {
      class: ['shadow-xs', 'border-field text-lo-contrast bg-transparent', 'hover:bg-tint', 'pressed:bg-tint'],
      isSelected: false,
      variant: 'secondary',
    },
    {
      class: ['text-lo-contrast border-transparent bg-transparent', 'hover:bg-tint', 'pressed:bg-tint'],
      isSelected: false,
      variant: 'tertiary',
    },
  ],
  defaultVariants: {
    isAttached: false,
    isIcon: false,
    isSelected: false,
    variant: 'secondary',
  },
  variants: {
    isAttached: {
      true: [
        'rounded-none',
        // The focus ring has to clear the neighbour it overlaps.
        'focus-visible:z-10',
        // horizontal
        'group-orientation-horizontal/toggle-group:-ml-px',
        'group-orientation-horizontal/toggle-group:first:ml-0',
        'group-orientation-horizontal/toggle-group:first:rounded-l-sm',
        'group-orientation-horizontal/toggle-group:last:rounded-r-sm',
        // vertical
        'group-orientation-vertical/toggle-group:-mt-px',
        'group-orientation-vertical/toggle-group:first:mt-0',
        'group-orientation-vertical/toggle-group:first:rounded-t-sm',
        'group-orientation-vertical/toggle-group:last:rounded-b-sm',
      ],
    },
    isIcon: {
      true: 'aspect-square w-(--height-ui-element) px-2 [&_svg]:mx-auto',
    },
    isSelected: {
      false: '',
      // Sits in rather than on: tinted, ruled, and unlifted.
      true: ['border-field text-hi-contrast bg-tint', 'hover:bg-tint', 'pressed:bg-tint', 'shadow-none'],
    },
    variant: {
      primary: '',
      secondary: '',
      tertiary: '',
    },
  },
})

export interface ToggleButtonProps extends RACToggleButtonProps {
  /** Convey semantic meaning with color. */
  intent?: Intent

  /** Square, fixed-size button for an icon. Pass `aria-label` when there is no text. */
  isIcon?: boolean

  ref?: ForwardedRef<HTMLButtonElement>

  /** Decorative node (e.g. an icon) rendered on the left. */
  slotLeft?: SlotNode

  /** Decorative node (e.g. an icon) rendered on the right. */
  slotRight?: SlotNode

  /** Visual emphasis. Falls back to the one set on the enclosing group. */
  variant?: ToggleButtonVariant
}

/** Turns an option on or off, sitting pressed in for as long as it stays on. */
export function ToggleButton({ intent, isIcon = false, ref, slotLeft, slotRight, variant, ...props }: ToggleButtonProps) {
  const group = use(ToggleGroupStyleContext)

  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        twMerge(
          toggleButtonStyles({
            isAttached: group?.isAttached ?? false,
            isIcon,
            isSelected: renderProps.isSelected,
            variant: variant ?? group?.variant ?? 'secondary',
          }),
          className,
          intent
        )
      )}
      ref={ref}
    >
      {composeRenderProps(props.children, (children) => (
        <>
          {renderSlot(slotLeft, {
            'data-slot': Slot.LEFT,
          })}

          {children}

          {renderSlot(slotRight, {
            'data-slot': Slot.RIGHT,
          })}
        </>
      ))}
    </RACToggleButton>
  )
}
ToggleButton.displayName = 'ToggleButton'
