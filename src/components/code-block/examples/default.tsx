'use client'

import { Card, CardBody, CodeBlock } from '@ui-kit.ai/components'

export default function CodeBlockDefault() {
    return (
        <Card>
            <CardBody>
                <CodeBlock language='typescript'>
                    {`const greet = (): void => {\n    console.log("Hello, world!");\n};\n\ngreet();`}
                </CodeBlock>
            </CardBody>
        </Card>
    )
}
