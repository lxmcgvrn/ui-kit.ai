'use client'

import { Breadcrumb, Breadcrumbs } from '@ui-kit.ai/components'

export default function BreadcrumbsCustomItems() {
    return (
        <Breadcrumbs>
            <Breadcrumb href='#'>
                <span className='flex items-center gap-1'>
                    <span className='text-blue-500'>🏠</span>
                    <span>Home</span>
                </span>
            </Breadcrumb>
            <Breadcrumb href='#'>
                <span className='flex items-center gap-1'>
                    <span className='text-green-500'>📦</span>
                    <span>Products</span>
                </span>
            </Breadcrumb>
            <Breadcrumb>
                <span className='flex items-center gap-1'>
                    <span className='text-purple-500'>📄</span>
                    <span>Current Page</span>
                </span>
            </Breadcrumb>
        </Breadcrumbs>
    )
}
