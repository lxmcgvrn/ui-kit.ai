/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */

import type { SearchField, SearchFieldClearButton } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type SearchFieldClearButtonProps = ComponentProps<typeof SearchFieldClearButton>

export type SearchFieldProps = ComponentProps<typeof SearchField>
