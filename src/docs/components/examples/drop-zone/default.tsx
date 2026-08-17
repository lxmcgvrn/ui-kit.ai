'use client'

import { DropZone, DropZoneLabel } from '@ui-kit.ai/components'
import { LucideUpload } from 'lucide-react'

export default function DropZoneDefault() {
  return (
    <DropZone className='max-w-96'>
      <LucideUpload aria-hidden />
      <DropZoneLabel>Drop files here</DropZoneLabel>
    </DropZone>
  )
}
