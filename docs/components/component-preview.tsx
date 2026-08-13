import type { ReactNode } from 'react'

import { DemoFrame } from '@/components/demo-frame'
import { highlight } from 'fumadocs-core/highlight'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const DEMOS_DIR = path.join(process.cwd(), 'components', 'demos')

export type ComponentPreviewProps = {
    /** The rendered demo. Import it from `@/components/demos/<name>`. */
    children: ReactNode
    /**
     * Set to `true` when the demo talks to a mock API, so it is only rendered
     * once the MSW service worker is ready.
     */
    mocks?: boolean
    /**
     * Path of the demo file relative to `components/demos`, without the
     * extension — e.g. `button/intent-error`.
     */
    name: string
}

/**
 * Renders a component demo with a `Preview` tab (the live component) and a
 * `Code` tab containing the demo file's actual source, read from disk when the
 * page is statically generated.
 */
export async function ComponentPreview({ children, mocks = false, name }: ComponentPreviewProps) {
    const source = await readFile(path.join(DEMOS_DIR, `${name}.tsx`), 'utf8')

    const code = await highlight(source.trim(), {
        components: {
            pre: (props) => (
                <CodeBlock
                    className='my-0'
                    {...props}
                >
                    <Pre>{props.children}</Pre>
                </CodeBlock>
            ),
        },
        lang: 'tsx',
        themes: {
            dark: 'github-dark',
            light: 'github-light',
        },
    })

    return (
        <Tabs
            // Keep the tab state per demo rather than shared across the page.
            groupId={`component-preview-${name}`}
            items={['Preview', 'Code']}
        >
            <Tab value='Preview'>
                <DemoFrame mocks={mocks}>{children}</DemoFrame>
            </Tab>
            <Tab value='Code'>{code}</Tab>
        </Tabs>
    )
}
