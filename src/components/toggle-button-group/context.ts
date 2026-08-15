import { createContext } from 'react'

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
