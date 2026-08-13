'use client'

import { FieldButton } from '@ui-kit.ai/components'
import { ClipboardCopyIcon, EyeIcon, XIcon } from 'lucide-react'

export default function FieldButtonDefault() {
    return (
        <div className='flex gap-2'>
            <FieldButton aria-label='Clear field'>
                <XIcon />
            </FieldButton>
            <FieldButton aria-label='Toggle visibility'>
                <EyeIcon />
            </FieldButton>
            <FieldButton aria-label='Copy to clipboard'>
                <ClipboardCopyIcon />
            </FieldButton>
        </div>
    )
}
