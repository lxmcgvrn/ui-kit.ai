import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { ThemeEditorNavButton } from '@/components/theme-editor'

export const GITHUB_URL = 'https://github.com/alex-mcgovern/ui-kit.ai'

/** Layout options shared between the home layout and the docs layout. */
export function baseOptions(): BaseLayoutProps {
    return {
        githubUrl: GITHUB_URL,
        // See https://fumadocs.dev/docs/ui/navigation/links
        links: [
            {
                active: 'nested-url',
                text: 'Documentation',
                url: '/docs',
            },
        ],
        nav: {
            // Rendered by both the home navbar and the docs sidebar header.
            children: <ThemeEditorNavButton />,
            title: <span className='font-mono font-medium'>@ui-kit.ai</span>,
        },
    }
}
