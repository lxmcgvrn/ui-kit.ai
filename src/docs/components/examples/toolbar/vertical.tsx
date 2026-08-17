'use client'

import { Button, Separator, Toolbar } from '@ui-kit.ai/components'
import { LucideCopy, LucidePencil, LucideShare2, LucideTrash2 } from 'lucide-react'

export default function ToolbarVertical() {
  return (
    <Toolbar
      aria-label='Row actions'
      orientation='vertical'
    >
      <Button
        slotLeft={<LucidePencil />}
        variant='tertiary'
      >
        Edit
      </Button>
      <Button
        slotLeft={<LucideCopy />}
        variant='tertiary'
      >
        Duplicate
      </Button>
      <Button
        slotLeft={<LucideShare2 />}
        variant='tertiary'
      >
        Share
      </Button>

      <Separator />

      <Button
        intent='error'
        slotLeft={<LucideTrash2 />}
        variant='tertiary'
      >
        Delete
      </Button>
    </Toolbar>
  )
}
