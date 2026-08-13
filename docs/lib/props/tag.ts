import type { Tag, TagButton, TagLink } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type TagButtonProps = ComponentProps<typeof TagButton>

export type TagLinkProps = ComponentProps<typeof TagLink>

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */
export type TagProps = ComponentProps<typeof Tag>
