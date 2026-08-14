'use client'

import type { ReactNode } from 'react'

import { Loader } from '@ui-kit.ai/components'
import { useEffect, useState } from 'react'

let workerPromise: null | Promise<void> = null

/** Renders children once the mock API is intercepting requests. */
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

/** After upgrading msw, regenerate `public/mockServiceWorker.js`. */
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
