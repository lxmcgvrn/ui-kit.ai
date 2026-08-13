import type { ListBox, OptionsSchema } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 *
 * `ListBox` is generic over its options schema; it is instantiated here with
 * the listbox schema, which is what every documented example uses.
 */
export type ListBoxProps = ComponentProps<typeof ListBox<OptionsSchema<'listbox'>>>
