import type { ComponentProps, ReactNode } from 'react'

import { DemoFrame } from '@/components/demo-frame'
import { highlight } from 'fumadocs-core/highlight'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

/** `src/components` — where examples live, next to their component. */
const COMPONENTS_DIR = path.join(process.cwd(), '..', 'components')

export interface ComponentPreviewProps {
    /** The rendered demo, imported from `./examples/&lt;example>`. */
    children: ReactNode
    /** Wait for the MSW mock API before rendering the demo. */
    mocks?: boolean
    /** `&lt;component>/&lt;example>`, under that component's `examples` dir. */
    name: string
}

/** Renders a demo in a `Preview` tab and its source in a `Code` tab. */
export async function ComponentPreview({ children, mocks = false, name }: ComponentPreviewProps) {
    const source = await readExampleSource(name)

    const code = await highlight(source.trim(), {
        components: {
            pre: (props: ComponentProps<'pre'>) => (
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

async function readExampleSource(name: string) {
    const [component = '', example = ''] = name.split('/')

    return readFile(path.join(COMPONENTS_DIR, component, 'examples', `${example}.tsx`), 'utf8')
}
