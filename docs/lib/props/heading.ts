import type { Heading } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */
export type HeadingProps = ComponentProps<typeof Heading>
