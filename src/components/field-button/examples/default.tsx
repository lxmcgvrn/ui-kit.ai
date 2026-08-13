'use client'

import { FieldButton } from '@ui-kit.ai/components'
import { LucideClipboardCopy, LucideEye, LucideX } from 'lucide-react'

export default function FieldButtonDefault() {
    return (
        <div className='flex gap-2'>
            <FieldButton aria-label='Clear field'>
                <LucideX />
            </FieldButton>
            <FieldButton aria-label='Toggle visibility'>
                <LucideEye />
            </FieldButton>
            <FieldButton aria-label='Copy to clipboard'>
                <LucideClipboardCopy />
            </FieldButton>
        </div>
    )
}
