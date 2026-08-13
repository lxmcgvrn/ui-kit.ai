import type { Popover, PopoverDialog } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has named, exported types to document —
 * the component package only exports the components themselves.
 */
export type PopoverDialogProps = ComponentProps<typeof PopoverDialog>

export type PopoverProps = ComponentProps<typeof Popover>
