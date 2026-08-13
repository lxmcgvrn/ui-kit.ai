import type {
    ComboBoxButton,
    ComboBoxInput,
    FormComboBox,
    OptionsSchema,
} from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type ComboBoxButtonProps = ComponentProps<typeof ComboBoxButton>

export type ComboBoxInputProps = ComponentProps<typeof ComboBoxInput>

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves. The generic is
 * instantiated with the default listbox options schema, as the demos use it.
 */
export type FormComboBoxProps = ComponentProps<typeof FormComboBox<OptionsSchema<'listbox'>>>
