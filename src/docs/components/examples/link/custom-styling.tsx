'use client'

import { Link } from '@ui-kit.ai/components'

export default function LinkCustomStyling() {
    return (
        <Link
            className='error text-lo-contrast underline'
            href='#'
        >
            Learn more
        </Link>
    )
}
