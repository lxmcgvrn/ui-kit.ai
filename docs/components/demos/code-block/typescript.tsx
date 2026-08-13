'use client'

import { CodeBlock } from '@ui-kit.ai/components'

export default function CodeBlockTypeScript() {
    return (
        <CodeBlock language='typescript'>
            {`const greet = (): void => {\n    console.log("Hello, world!");\n};\n\ngreet();`}
        </CodeBlock>
    )
}
