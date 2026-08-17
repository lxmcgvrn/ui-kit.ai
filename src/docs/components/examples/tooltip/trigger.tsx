'use client'

import { Button, Tooltip, TooltipTrigger } from '@ui-kit.ai/components'

export default function TooltipTriggerDemo() {
  return (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip>This is the tooltip</Tooltip>
    </TooltipTrigger>
  )
}
