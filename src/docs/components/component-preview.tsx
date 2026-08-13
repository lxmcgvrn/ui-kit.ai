import type { ReactNode } from 'react'

import { DemoFrame } from '@/components/demo-frame'
import { highlight } from 'fumadocs-core/highlight'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

/** `src/components` — where examples live, next to their component. */
const COMPONENTS_DIR = path.join(process.cwd(), '..', 'components')

export type ComponentPreviewProps = {
    /** The rendered demo, imported from `./examples/<example>`. */
    children: ReactNode
    /**
     * Set to `true` when the demo talks to a mock API, so it is only rendered
     * once the MSW service worker is ready.
     */
    mocks?: boolean
    /**
     * `<component>/<example>` — resolved to
     * `src/components/<component>/examples/<example>.tsx`.
     */
    name: string
}

/**
 * Renders a component demo with a `Preview` tab (the live component) and a
 * `Code` tab containing the demo file's actual source, read from disk when the
 * page is statically generated.
 */
export async function ComponentPreview({ children, mocks = false, name }: ComponentPreviewProps) {
    const source = await readExampleSource(name)

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

/**
 * Reads an example's source straight off disk, so the `Code` tab always shows
 * what actually ran.
 */
async function readExampleSource(name: string) {
    const [component = '', example = ''] = name.split('/')

    return readFile(path.join(COMPONENTS_DIR, component, 'examples', `${example}.tsx`), 'utf8')
}
