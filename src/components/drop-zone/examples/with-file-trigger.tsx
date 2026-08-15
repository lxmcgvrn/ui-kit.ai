'use client'

import { Button, DropZone, DropZoneLabel, FileTrigger } from '@ui-kit.ai/components'
import { LucideUpload } from 'lucide-react'
import { useState } from 'react'

export default function DropZoneWithFileTrigger() {
    const [files, setFiles] = useState<string[]>([])

    return (
        <div className='max-w-96'>
            <DropZone
                onDrop={(event) => {
                    const names = event.items
                        .filter((item) => item.kind === 'file')
                        .map((item) => item.name)

                    setFiles(names)
                }}
            >
                <LucideUpload aria-hidden />
                <DropZoneLabel>Drop files here</DropZoneLabel>
                <p className='text-sm'>or</p>
                <FileTrigger
                    allowsMultiple
                    onSelect={(selected) => {
                        setFiles([...(selected ?? [])].map((file) => file.name))
                    }}
                >
                    <Button variant='secondary'>Browse files</Button>
                </FileTrigger>
            </DropZone>

            {files.length > 0 ? (
                <ul className='text-lo-contrast mt-2 text-sm'>
                    {files.map((name) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}
