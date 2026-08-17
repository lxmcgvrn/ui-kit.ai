import type { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Markdown } from './markdown'

type ChatOrigin = 'them' | 'us'

const messageBubbleStyles = tv({
  base: ['text-hi-contrast relative px-3 py-2 md:max-w-4/5'],
  variants: {
    origin: {
      them: ['justify-self-start-safe left-0'],
      us: ['bg-tint right-0 justify-self-end-safe rounded-xl rounded-tr-none'],
    },
  },
})

export interface ChatProps {
  /** The messages to render, typically a list of {@link ChatMessage}. */
  children: ReactNode
  className?: string
}

/** A `Chat` contains a list of messages. */
export function Chat({ children, className }: ChatProps) {
  return <section className={twMerge('flex w-full flex-col gap-4', className)}>{children}</section>
}
Chat.displayName = 'Chat'

export interface ChatMessageProps {
  className?: string

  /** The message body, rendered as markdown. */
  content: string

  /** A stable identifier for the message, used to label it accessibly. */
  id: string

  /** Who sent the message, which determines alignment and styling. */
  origin: ChatOrigin
}

/** A `ChatMessage` renders a single message. */
export function ChatMessage({ className, content, id, origin }: ChatMessageProps) {
  return (
    <section
      aria-labelledby={id}
      className={className}
      data-message-id={id}
      role='article'
    >
      <div
        className={messageBubbleStyles({
          origin,
        })}
      >
        <Markdown>{content}</Markdown>
      </div>
    </section>
  )
}
ChatMessage.displayName = 'ChatMessage'
