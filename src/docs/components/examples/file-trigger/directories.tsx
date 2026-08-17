'use client'

import { Button, FileTrigger } from '@ui-kit.ai/components'
import { useState } from 'react'

export default function FileTriggerDirectories() {
    const [count, setCount] = useState(0)

    return (
        <div className='flex items-center gap-4'>
            <FileTrigger
                acceptDirectory
                onSelect={(selected) => {
                    setCount(selected?.length ?? 0)
                }}
            >
                <Button variant='secondary'>Select a folder</Button>
            </FileTrigger>
            {count > 0 ? (
                <span className='text-lo-contrast text-sm'>{count} files selected</span>
            ) : null}
        </div>
    )
}
