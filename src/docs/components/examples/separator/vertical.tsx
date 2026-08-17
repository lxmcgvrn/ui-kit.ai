'use client'

import { Separator } from '@ui-kit.ai/components'

export default function SeparatorVertical() {
    return (
        <div className='text-lo-contrast flex h-8 items-center gap-4 text-sm'>
            <span>Drafts</span>
            <Separator orientation='vertical' />
            <span>Published</span>
            <Separator orientation='vertical' />
            <span>Archived</span>
        </div>
    )
}
