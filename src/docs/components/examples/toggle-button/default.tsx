'use client'

import { ToggleButton } from '@ui-kit.ai/components'
import { LucideBold } from 'lucide-react'

export default function ToggleButtonDefault() {
  return <ToggleButton slotLeft={<LucideBold />}>Bold</ToggleButton>
}
