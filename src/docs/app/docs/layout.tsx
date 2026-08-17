import type { ReactNode } from 'react'

import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  )
}
