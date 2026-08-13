import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import './global.css'

import { UIKitRouterProvider } from '@/components/providers/router-provider'
import { RootProvider } from 'fumadocs-ui/provider'
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin', 'latin-ext'],
})

export const metadata: Metadata = {
    description: 'A component library for the AI age.',
    title: {
        default: 'ui-kit.ai',
        template: '%s | ui-kit.ai',
    },
}

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html
            className={inter.className}
            lang='en'
            suppressHydrationWarning
        >
            <body className='relative flex min-h-screen flex-col antialiased'>
                <RootProvider
                    search={{
                        options: {
                            // Static search indexes are exported to `/static.json`
                            // at build time — see `app/static.json/route.ts`.
                            api: '/static.json',
                            type: 'static',
                        },
                    }}
                >
                    <UIKitRouterProvider>{children}</UIKitRouterProvider>
                </RootProvider>
            </body>
        </html>
    )
}
