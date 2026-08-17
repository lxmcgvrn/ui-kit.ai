import type { ForwardedRef } from 'react'
import type { ToggleButtonGroupProps as RACToggleButtonGroupProps } from 'react-aria-components'

import { createContext, useMemo } from 'react'
import { composeRenderProps, ToggleButtonGroup as RACToggleButtonGroup } from 'react-aria-components'
import { tv } from 'tailwind-variants'

/** Visual emphasis, highest first: `primary`, `secondary`, `tertiary`. */
export type ToggleButtonVariant = 'primary' | 'secondary' | 'tertiary'

/** What a group hands every toggle inside it: one variant, and its edges. */
export interface ToggleGroupStyle {
  isAttached: boolean
  variant: ToggleButtonVariant
}

/** Lets each `ToggleButton` read the styling set once on its group. */
export const ToggleGroupStyleContext = createContext<null | ToggleGroupStyle>(null)
ToggleGroupStyleContext.displayName = 'ToggleGroupStyleContext'

const toggleButtonGroupStyles = tv({
  base: 'group/toggle-group orientation-vertical:flex-col flex w-fit',
  defaultVariants: {
    isAttached: true,
  },
  variants: {
    isAttached: {
      // Buttons pull onto each other's borders, so they need a stacking context.
      false: 'gap-2',
      true: 'isolate',
    },
  },
})

export interface ToggleButtonGroupProps extends RACToggleButtonGroupProps {
  /** Joins the buttons into one run, sharing their inner edges. */
  isAttached?: boolean

  ref?: ForwardedRef<HTMLDivElement>

  /** Visual emphasis for every `ToggleButton` in the group. */
  variant?: ToggleButtonVariant
}

/** A set of related toggles, sharing one selection between them. */
export function ToggleButtonGroup({ isAttached = true, ref, variant = 'secondary', ...props }: ToggleButtonGroupProps) {
  const style = useMemo(() => ({ isAttached, variant }), [isAttached, variant])

  return (
    <ToggleGroupStyleContext value={style}>
      <RACToggleButtonGroup
        {...props}
        className={composeRenderProps(props.className, (className) =>
          toggleButtonGroupStyles({
            className,
            isAttached,
          })
        )}
        ref={ref}
      />
    </ToggleGroupStyleContext>
  )
}
ToggleButtonGroup.displayName = 'ToggleButtonGroup'
