import type { Chat, ChatMessage } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */
export type ChatMessageProps = ComponentProps<typeof ChatMessage>

export type ChatProps = ComponentProps<typeof Chat>
