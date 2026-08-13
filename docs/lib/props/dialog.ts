import type {
    Dialog,
    DialogModal,
    DialogModalOverlay,
    DialogTitle,
    DialogTrigger,
} from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type DialogModalOverlayProps = ComponentProps<typeof DialogModalOverlay>

export type DialogModalProps = ComponentProps<typeof DialogModal>

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */
export type DialogProps = ComponentProps<typeof Dialog>

export type DialogTitleProps = ComponentProps<typeof DialogTitle>

export type DialogTriggerProps = ComponentProps<typeof DialogTrigger>
