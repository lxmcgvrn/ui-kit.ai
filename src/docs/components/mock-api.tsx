'use client'

import type { ReactNode } from 'react'

import { Loader } from '@ui-kit.ai/components'
import { useEffect, useState } from 'react'

let workerPromise: null | Promise<void> = null

/**
 * Delays rendering its children until the mock API is intercepting requests,
 * so demos don't fire real network requests on first paint.
 */
export function MockApiGate({ children }: { children: ReactNode }) {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let isMounted = true

        void startMockApi().then(() => {
            if (isMounted) setIsReady(true)
        })

        return () => {
            isMounted = false
        }
    }, [])

    if (!isReady) return <Loader />

    return children
}

/**
 * Boots the MSW browser worker (once per page load) with the handlers from
 * `@ui-kit.ai/mocks`, so demos that call an API have something to talk to.
 *
 * The worker script itself lives at `public/mockServiceWorker.js` — regenerate
 * it with `pnpm --filter docs exec msw init public` after upgrading `msw`.
 */
function startMockApi(): Promise<void> {
    workerPromise ??= (async () => {
        const [{ fibonacciStreamHandler, getStocksHandler, llmStreamHandler }, { setupWorker }] =
            await Promise.all([import('@ui-kit.ai/mocks'), import('msw/browser')])

        await setupWorker(fibonacciStreamHandler, getStocksHandler, llmStreamHandler).start({
            onUnhandledRequest: 'bypass',
            quiet: true,
            serviceWorker: { url: '/mockServiceWorker.js' },
        })
    })()

    return workerPromise
}
