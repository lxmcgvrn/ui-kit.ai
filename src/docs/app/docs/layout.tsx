import type { ReactNode } from 'react'

import { SidebarTreeDocs } from '@/components/sidebar-tree'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      sidebar={{ component: <SidebarTreeDocs tree={source.pageTree} /> }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  )
}
