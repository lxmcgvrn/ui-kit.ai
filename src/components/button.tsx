import type { ForwardedRef } from 'react'
import type {
  ButtonProps as RACButtonProps,
  ButtonRenderProps as RACButtonRenderProps,
  LinkProps as RACLinkProps,
} from 'react-aria-components'

import { av } from 'aria-variants'
import { composeRenderProps, Button as RACButton, Link as RACLink } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import type { Intent } from './types/intent'

import { Loader } from './loader'
import { renderSlot, type SlotNode } from './types/slotted-node'

interface ButtonVariants {
  isIcon: boolean
  variant: 'primary' | 'secondary' | 'tertiary'
}

const buttonStyle = av<RACButtonRenderProps, ButtonVariants>({
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
  ],
  compoundVariants: [
    { className: 'bg-tint', isHovered: true, variant: 'secondary' },
    { className: 'bg-tint', isHovered: true, variant: 'tertiary' },
    { className: 'bg-tint', isPressed: true, variant: 'secondary' },
    { className: 'bg-tint', isPressed: true, variant: 'tertiary' },
  ],
  defaultVariants: {
    variant: 'primary',
  },
  variants: {
    isDisabled: {
      true: ['cursor-not-allowed', 'opacity-50'],
    },
    isIcon: {
      true: 'aspect-square w-(--height-ui-element) px-2 [&_svg]:mx-auto',
    },
    variant: {
      primary: 'surface-primary',
      secondary: ['shadow-xs', 'border-field text-lo-contrast bg-transparent'],
      tertiary: ['text-lo-contrast border-transparent bg-transparent'],
    },
  },
})

interface ButtonCommonProps {
  /** Convey semantic meaning with color. */
  intent?: Intent

  /** Styles the button red, to denote a destructive action. */
  isDestructive?: boolean

  /** Square, fixed-size button for an icon. Pass `aria-label` when there is no text. */
  isIcon?: boolean

  /** Decorative node (e.g. an icon) rendered on the left. */
  slotLeft?: SlotNode

  /** Decorative node (e.g. an icon) rendered on the right. */
  slotRight?: SlotNode

  /** Visual emphasis, highest first: `primary`, `secondary`, `tertiary`. */
  variant?: 'primary' | 'secondary' | 'tertiary'
}

type LinkButtonProps = ButtonCommonProps &
  RACLinkProps & {
    ref?: ForwardedRef<HTMLAnchorElement>
  }

const ButtonLoadingState = ({ children, isPending }: { children: React.ReactNode; isPending?: boolean }) =>
  isPending === true ? (
    <div className='relative'>
      <div
        aria-hidden
        className='opacity-0'
      >
        {children}
      </div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <Loader className='!size-4' />
      </div>
    </div>
  ) : (
    children
  )
ButtonLoadingState.displayName = 'ButtonLoadingState'

export interface ButtonProps extends ButtonCommonProps, RACButtonProps {
  ref?: ForwardedRef<HTMLButtonElement>
}

/** Performs an action on click, tap, or keypress. */
export function Button({
  intent,
  isDestructive,
  isIcon = false,
  isPending,
  ref,
  slotLeft,
  slotRight,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge(buttonStyle({ isIcon, variant }), className, intent))}
      isPending={isPending}
      ref={ref}
    >
      {(renderProps) => (
        <ButtonLoadingState isPending={isPending}>
          {renderSlot(slotLeft, {
            'data-slot': 'slot-left',
          })}

          {typeof props.children === 'function' ? props.children(renderProps) : props.children}

          {renderSlot(slotRight, {
            'data-slot': 'slot-right',
          })}
        </ButtonLoadingState>
      )}
    </RACButton>
  )
}
Button.displayName = 'Button'

/** An anchor wearing the {@link Button} styling. */
export const LinkButton = ({ intent, isIcon, ref, slotLeft, slotRight, variant, ...props }: LinkButtonProps) => {
  return (
    <RACLink
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge(buttonStyle({ isIcon, variant }), className, intent))}
      ref={ref}
    >
      {(renderProps) => (
        <>
          {renderSlot(slotLeft, {
            'data-slot': 'slot-left',
          })}

          {typeof props.children === 'function' ? props.children(renderProps) : props.children}

          {renderSlot(slotRight, {
            'data-slot': 'slot-right',
          })}
        </>
      )}
    </RACLink>
  )
}
LinkButton.displayName = 'LinkButton'
