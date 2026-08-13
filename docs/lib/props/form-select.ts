import type { FormSelect, OptionsSchema, SelectButton } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves. The generic is
 * instantiated with the default listbox options schema, as the demos use it.
 */
export type FormSelectProps = ComponentProps<typeof FormSelect<OptionsSchema<'listbox'>>>

export type SelectButtonProps = ComponentProps<typeof SelectButton>
