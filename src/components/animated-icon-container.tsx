import type { ReactElement } from 'react'

import { Children, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export interface AnimatedIconContainerProps {
  /** The icon on show. Render a different one and the swap animates. */
  children: ReactElement

  className?: string
}

interface IconSlot {
  icon: ReactElement
  id: number
}

interface IconSlotProps {
  isExiting: boolean
  onExited: (id: number) => void
  slot: IconSlot
}

interface Swap {
  current: IconSlot
  exiting: IconSlot | null
}

/** Drops an outgoing icon when no `transitionend` arrives to drop it. */
const EXIT_FALLBACK_MS = 400

/** Animates between icons, in and out of the same cell, whenever its child changes. */
export function AnimatedIconContainer({ children, className }: AnimatedIconContainerProps) {
  const icon = Children.only(children)
  const [swap, setSwap] = useState<Swap>(() => ({ current: { icon, id: 0 }, exiting: null }))

  if (isDifferentIcon(swap.current.icon, icon)) {
    setSwap({ current: { icon, id: swap.current.id + 1 }, exiting: swap.current })
  }

  const onExited = useCallback((id: number) => {
    setSwap((previous) => (previous.exiting?.id === id ? { ...previous, exiting: null } : previous))
  }, [])

  const current = { icon, id: swap.current.id }
  const stack = swap.exiting == null ? [current] : [swap.exiting, current]

  return (
    <div className={twMerge('inline-grid place-items-center', className)}>
      {stack.map((slot) => (
        <IconSlotView
          isExiting={slot.id !== current.id}
          key={slot.id}
          onExited={onExited}
          slot={slot}
        />
      ))}
    </div>
  )
}
AnimatedIconContainer.displayName = 'AnimatedIconContainer'

function IconSlotView({ isExiting, onExited, slot }: IconSlotProps) {
  const { icon, id } = slot

  useEffect(() => {
    if (!isExiting) {
      return
    }

    const timeout = setTimeout(() => {
      onExited(id)
    }, EXIT_FALLBACK_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [id, isExiting, onExited])

  return (
    <div
      aria-hidden={isExiting || undefined}
      className='exiting:scale-90 exiting:opacity-0 exiting:blur-xs col-start-1 row-start-1 transition-all duration-200 ease-out
        motion-reduce:transition-none data-swapped:starting:scale-90 data-swapped:starting:opacity-0 data-swapped:starting:blur-xs'
      data-exiting={isExiting || undefined}
      data-swapped={id > 0 || undefined}
      onTransitionEnd={(event) => {
        if (isExiting && event.target === event.currentTarget) {
          onExited(id)
        }
      }}
    >
      {icon}
    </div>
  )
}
IconSlotView.displayName = 'IconSlotView'

/** A swap is a different element type, or the same type under a different key. */
function isDifferentIcon(previous: ReactElement, next: ReactElement) {
  return previous.type !== next.type || previous.key !== next.key
}
