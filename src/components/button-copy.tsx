import type { ComponentProps } from 'react'

import { LucideCheck, LucideClipboard } from 'lucide-react'

import { AnimatedIconContainer } from './animated-icon-container'
import { Button } from './button'
import { useCopyConfirmation } from './hooks/use-copy-confirmation'

export interface ButtonCopyProps extends Omit<ComponentProps<typeof Button>, 'children' | 'isIcon' | 'onPress' | 'slotLeft'> {
  /** Names what pressing copies, since the icon says nothing on its own. */
  'aria-label': string

  /** Builds the string to copy. Runs on press, not on render. */
  getValue: () => string
}

/** Copies a value to the clipboard, and confirms it for a moment afterwards. */
export function ButtonCopy({ getValue, ...props }: ButtonCopyProps) {
  const { confirmCopy, hasCopied } = useCopyConfirmation()

  const onPress = async () => {
    try {
      await navigator.clipboard.writeText(getValue())
    } catch {
      return
    }

    confirmCopy()
  }

  return (
    <Button
      {...props}
      isIcon
      onPress={() => void onPress()}
    >
      <AnimatedIconContainer>{hasCopied ? <LucideCheck /> : <LucideClipboard />}</AnimatedIconContainer>
    </Button>
  )
}
ButtonCopy.displayName = 'ButtonCopy'
