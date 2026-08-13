'use client'

import { FieldButton } from '@ui-kit.ai/components'
import { ClipboardCopyIcon, EyeIcon, XIcon } from 'lucide-react'

export default function FieldButtonDisabled() {
    return (
        <div className='flex gap-2'>
            <FieldButton
                aria-label='Clear field'
                isDisabled
            >
                <XIcon />
            </FieldButton>
            <FieldButton
                aria-label='Toggle visibility'
                isDisabled
            >
                <EyeIcon />
            </FieldButton>
            <FieldButton
                aria-label='Copy to clipboard'
                isDisabled
            >
                <ClipboardCopyIcon />
            </FieldButton>
        </div>
    )
}
