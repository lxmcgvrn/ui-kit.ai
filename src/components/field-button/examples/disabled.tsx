'use client'

import { FieldButton } from '@ui-kit.ai/components'
import { LucideClipboardCopy, LucideEye, LucideX } from 'lucide-react'

export default function FieldButtonDisabled() {
    return (
        <div className='flex gap-2'>
            <FieldButton
                aria-label='Clear field'
                isDisabled
            >
                <LucideX />
            </FieldButton>
            <FieldButton
                aria-label='Toggle visibility'
                isDisabled
            >
                <LucideEye />
            </FieldButton>
            <FieldButton
                aria-label='Copy to clipboard'
                isDisabled
            >
                <LucideClipboardCopy />
            </FieldButton>
        </div>
    )
}
