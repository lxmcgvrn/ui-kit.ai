'use client'

import { CodeBlock } from '@ui-kit.ai/components'

export default function CodeBlockRust() {
  return <CodeBlock language='rust'>{`fn main() {\n    println!("Hello, world!");\n}`}</CodeBlock>
}
