/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 *
 * `Menu` is generic over its options schema; it is instantiated here with the
 * menu schema, which is what every documented example uses.
 */

import type { Menu, MenuTrigger, OptionsSchema } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type MenuProps = ComponentProps<typeof Menu<OptionsSchema<'menu'>>>

export type MenuTriggerProps = ComponentProps<typeof MenuTrigger>
