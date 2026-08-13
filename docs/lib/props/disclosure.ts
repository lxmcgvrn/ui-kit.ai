import type { Disclosure, DisclosureButton, DisclosurePanel } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */
export type DisclosureButtonProps = ComponentProps<typeof DisclosureButton>

export type DisclosurePanelProps = ComponentProps<typeof DisclosurePanel>

export type DisclosureProps = ComponentProps<typeof Disclosure>
