import { LucideInfo } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { ActionNodes } from './types/action-nodes'
import type { Intent } from './types/intent'

import { renderActionNodes } from './types/action-nodes'
import { renderSlot } from './types/slotted-node'

const alertStyles = tv({
  base: [
    'w-full',
    'rounded-lg',
    'shadow-xs',
    'border-default border',
    'bg-tint',
    'text-lo-contrast',
    'p-2 pl-3',
    'flex items-center gap-3',
  ],
})

const titleStyles = tv({
  base: 'font-title mb-0 block text-sm font-medium',
})

export interface AlertProps {
  /** Action nodes (e.g. buttons) rendered at the end of the alert. */
  actions?: ActionNodes
  className?: string

  /** A decorative node rendered before the alert text. */
  icon?: React.JSX.Element

  /** Convey semantic meaning with color. */
  intent?: Intent

  /** The message shown to the user. */
  text: string
}

/** A message surfaced to the user, announced via the ARIA `alert` role. */
export function Alert({ actions, className, icon = <LucideInfo />, intent, text, ...props }: AlertProps) {
  return (
    <div
      {...props}
      className={twMerge(alertStyles(), className, intent)}
    >
      {renderSlot(icon, {
        'aria-hidden': true,
        className: 'size-4 shrink-0',
        role: 'img',
      })}
      <div>
        {/* Not a heading: an alert can precede the H1 and break order. */}
        <span
          className={titleStyles()}
          role='alert'
        >
          {text}
        </span>
      </div>
      {renderActionNodes({
        actions,
        className: 'ml-auto',
        props: {},
      })}
    </div>
  )
}
Alert.displayName = 'Alert'
