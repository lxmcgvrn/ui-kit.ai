'use client'

import { Button, FileTrigger } from '@ui-kit.ai/components'
import { LucideImage } from 'lucide-react'
import { useState } from 'react'

export default function FileTriggerAcceptedTypes() {
  const [files, setFiles] = useState<string[]>([])

  return (
    <div className='flex items-center gap-4'>
      <FileTrigger
        acceptedFileTypes={['image/png', 'image/jpeg']}
        allowsMultiple
        onSelect={(selected) => {
          setFiles([...(selected ?? [])].map((file) => file.name))
        }}
      >
        <Button
          slotLeft={<LucideImage />}
          variant='secondary'
        >
          Select images
        </Button>
      </FileTrigger>
      <span className='text-lo-contrast text-sm'>{files.join(', ')}</span>
    </div>
  )
}
