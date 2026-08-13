'use client'

import type { ReactNode } from 'react'

import { RouterProvider } from '@ui-kit.ai/components'
import { useRouter } from 'next/navigation'

/**
 * Teaches react-aria-components' client-side routing about the Next.js router,
 * so ui-kit `href` props (links, menu items, list box items) do soft navigation.
 */
export function UIKitRouterProvider({ children }: { children: ReactNode }) {
    const router = useRouter()

    return <RouterProvider navigate={router.push}>{children}</RouterProvider>
}
