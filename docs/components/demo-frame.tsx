import type { ReactNode } from 'react'

import { MockApiGate } from '@/components/mock-api'

/**
 * The surface component demos are rendered on: a dot-grid canvas painted with
 * the ui-kit theme tokens (rather than the Fumadocs theme), so demos look the
 * same as they do in a consuming app.
 */
export function DemoFrame({ children, mocks = false }: { children: ReactNode; mocks?: boolean }) {
    return (
        <div
            className={`bg-base-raised relative flex min-h-56 items-center justify-center overflow-hidden rounded-lg
                bg-[radial-gradient(var(--theme-default-bg-tint)_1px,transparent_1px)] [background-size:16px_16px]
                p-8`}
        >
            {mocks ? <MockApiGate>{children}</MockApiGate> : children}
        </div>
    )
}
