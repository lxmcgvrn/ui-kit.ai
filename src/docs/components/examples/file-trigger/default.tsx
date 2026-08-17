'use client'

import { Button, FileTrigger } from '@ui-kit.ai/components'
import { useState } from 'react'

export default function FileTriggerDefault() {
  const [file, setFile] = useState<null | string>(null)

  return (
    <div className='flex items-center gap-4'>
      <FileTrigger
        onSelect={(selected) => {
          setFile(selected?.[0]?.name ?? null)
        }}
      >
        <Button>Select a file</Button>
      </FileTrigger>
      {file != null ? <span className='text-lo-contrast text-sm'>{file}</span> : null}
    </div>
  )
}
