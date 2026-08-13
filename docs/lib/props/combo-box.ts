/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 *
 * `ComboBox` is generic over its options schema; it is instantiated here with
 * the listbox schema, which is what every documented example uses.
 */

import type {
    ComboBox,
    ComboBoxButton,
    ComboBoxClearButton,
    ComboBoxFieldGroup,
    ComboBoxInput,
    OptionsSchema,
} from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type ComboBoxButtonProps = ComponentProps<typeof ComboBoxButton>

export type ComboBoxClearButtonProps = ComponentProps<typeof ComboBoxClearButton>

export type ComboBoxFieldGroupProps = ComponentProps<typeof ComboBoxFieldGroup>

export type ComboBoxInputProps = ComponentProps<typeof ComboBoxInput>

export type ComboBoxProps = ComponentProps<typeof ComboBox<OptionsSchema<'listbox'>>>
