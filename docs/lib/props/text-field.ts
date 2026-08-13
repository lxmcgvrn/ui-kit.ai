/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */

import type {
    TextField,
    TextFieldClearButton,
    TextFieldCopyButton,
    TextFieldVisibilityButton,
} from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type TextFieldClearButtonProps = ComponentProps<typeof TextFieldClearButton>

export type TextFieldCopyButtonProps = ComponentProps<typeof TextFieldCopyButton>

export type TextFieldProps = ComponentProps<typeof TextField>

export type TextFieldVisibilityButtonProps = ComponentProps<typeof TextFieldVisibilityButton>
