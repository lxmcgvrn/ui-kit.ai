'use client'

import type { ReactNode } from 'react'

import { RouterProvider } from '@ui-kit.ai/components'
import { useRouter } from 'next/navigation'

/** Routes ui-kit `href` props through the Next.js router. */
export function UIKitRouterProvider({ children }: { children: ReactNode }) {
    const router = useRouter()

    return (
        <RouterProvider
            navigate={(path, routerOptions) => {
                router.push(path, routerOptions)
            }}
        >
            {children}
        </RouterProvider>
    )
}
