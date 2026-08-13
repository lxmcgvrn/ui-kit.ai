'use client'

import { TextArea } from '@ui-kit.ai/components'

export default function TextAreaDisabled() {
    return (
        <TextArea
            aria-disabled
            aria-label='Notes'
            placeholder='This is a placeholder'
        />
    )
}
