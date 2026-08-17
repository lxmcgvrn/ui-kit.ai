'use client'

import { CodeBlock } from '@ui-kit.ai/components'

export default function CodeBlockPython() {
  return <CodeBlock language='python'>{`def greet():\n    print("Hello, world!")\n\ngreet()`}</CodeBlock>
}
