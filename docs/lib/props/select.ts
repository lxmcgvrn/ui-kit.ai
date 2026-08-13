/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 *
 * `Select` is generic over its options schema; it is instantiated here with the
 * listbox schema, which is what every documented example uses.
 */

import type { OptionsSchema, Select, SelectButton } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type SelectButtonProps = ComponentProps<typeof SelectButton>

export type SelectProps = ComponentProps<typeof Select<OptionsSchema<'listbox'>>>
