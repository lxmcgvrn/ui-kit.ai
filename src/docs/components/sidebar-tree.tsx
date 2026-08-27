'use client'

import type * as PageTree from 'fumadocs-core/page-tree'
import type { ReactNode } from 'react'
import type { Key as RACKey } from 'react-aria-components'

import { ButtonThemeEditorNav } from '@/components/theme-editor'
import { GITHUB_URL } from '@/lib/layout.shared'
import { Link, Tree, TreeItem } from '@ui-kit.ai/components'
import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle'
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarContent,
  SidebarContentMobile,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarViewport,
} from 'fumadocs-ui/components/layout/sidebar'
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle'
import { CollapsibleControl } from 'fumadocs-ui/layouts/docs'
import { LucidePanelLeft, LucideX } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { tv } from 'tailwind-variants'

/* Fumadocs' triggers render bare buttons, so they take the icon-button look here. */
const triggerStyles = tv({
  base: [
    'inline-flex size-8 shrink-0 items-center justify-center',
    'rounded-sm',
    'text-placeholder',
    'cursor-pointer',
    'transition-colors',
    'hover:bg-tint hover:text-hi-contrast',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  ],
})

export interface SidebarTreeProps {
  tree: PageTree.Root
}

/** The docs sidebar, with the page tree rendered by the library's own `Tree`. */
export function SidebarTree({ tree }: SidebarTreeProps) {
  return (
    <>
      <CollapsibleControl />

      <SidebarContent>
        <SidebarHeader>
          <div className='flex items-center gap-1'>
            <Link
              className='text-hi-contrast me-auto font-mono text-sm font-medium no-underline'
              href='/'
            >
              @ui-kit.ai
            </Link>
            <ButtonThemeEditorNav />
            <SidebarCollapseTrigger className={triggerStyles()}>
              <LucidePanelLeft aria-hidden />
            </SidebarCollapseTrigger>
          </div>
          <LargeSearchToggle hideIfDisabled />
        </SidebarHeader>

        <SidebarViewport>
          <TreePages tree={tree} />
        </SidebarViewport>

        <SidebarFooter>
          <div className='flex w-full items-center justify-between'>
            <Link
              className='text-sm'
              href={GITHUB_URL}
              target='_blank'
            >
              GitHub
            </Link>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </>
  )
}
SidebarTree.displayName = 'SidebarTree'

/** The same content, framed for the drawer that the mobile navbar toggles. */
export function SidebarTreeMobile({ tree }: SidebarTreeProps) {
  return (
    <SidebarContentMobile>
      <SidebarHeader>
        <div className='flex w-full items-center justify-between'>
          <Link
            className='text-hi-contrast font-mono text-sm font-medium no-underline'
            href='/'
          >
            @ui-kit.ai
          </Link>
          <SidebarTrigger className={triggerStyles()}>
            <LucideX aria-hidden />
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarViewport>
        <div className='p-2'>
          <TreePages tree={tree} />
        </div>
      </SidebarViewport>
    </SidebarContentMobile>
  )
}
SidebarTreeMobile.displayName = 'SidebarTreeMobile'

/** Wires both framings into the slots fumadocs' sidebar plumbing expects. */
export function SidebarTreeDocs({ tree }: SidebarTreeProps) {
  return (
    <Sidebar
      Content={<SidebarTree tree={tree} />}
      Mobile={<SidebarTreeMobile tree={tree} />}
    />
  )
}
SidebarTreeDocs.displayName = 'SidebarTreeDocs'

/** The page tree as nested `TreeItem` rows; the showing page stays marked. */
function TreePages({ tree }: SidebarTreeProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Set<RACKey>>(() => new Set(foldersOnPath(tree.children, pathname)))

  /* A navigation from elsewhere — search, say — still reveals the new page. */
  useEffect(() => {
    setExpanded((current) => new Set([...current, ...foldersOnPath(tree.children, pathname)]))
  }, [pathname, tree])

  const toggleFolder = useCallback((key: string) => {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }

      return next
    })
  }, [])

  return (
    <Tree
      aria-label='Documentation'
      expandedKeys={expanded}
      expandIconPosition='right'
      onExpandedChange={setExpanded}
    >
      {tree.children.map((node) => renderNode(node, pathname, toggleFolder))}
    </Tree>
  )
}
TreePages.displayName = 'TreePages'

function folderKey(folder: PageTree.Folder): string {
  return folder.$id ?? folder.index?.url ?? textOf(folder.name)
}

/** Keys of every folder that should sit open for the page at `pathname`. */
function foldersOnPath(nodes: PageTree.Node[], pathname: string): string[] {
  const keys: string[] = []

  for (const node of nodes) {
    if (node.type !== 'folder') {
      continue
    }

    const inside = foldersOnPath(node.children, pathname)
    const holdsPage = node.children.some((child) => child.type === 'page' && child.url === pathname)
    if (node.defaultOpen === true || node.index?.url === pathname || holdsPage || inside.length > 0) {
      keys.push(folderKey(node), ...inside)
    }
  }

  return keys
}

function renderNode(node: PageTree.Node, pathname: string, onToggleFolder: (key: string) => void): ReactNode {
  if (node.type === 'separator') {
    return null
  }

  if (node.type === 'page') {
    return (
      <TreeItem
        {...{ 'data-current': node.url === pathname || undefined }}
        href={node.url}
        id={node.url}
        key={node.url}
        textValue={textOf(node.name)}
        title={node.name}
      />
    )
  }

  const key = folderKey(node)

  /* A folder with an index page navigates; one without toggles itself open. */
  return (
    <TreeItem
      {...{ 'data-current': node.index?.url === pathname || undefined }}
      href={node.index?.url}
      id={key}
      key={key}
      onAction={
        node.index == null
          ? () => {
              onToggleFolder(key)
            }
          : undefined
      }
      textValue={textOf(node.name)}
      title={node.name}
    >
      {node.children.map((child) => renderNode(child, pathname, onToggleFolder))}
    </TreeItem>
  )
}

function textOf(name: ReactNode): string {
  return typeof name === 'string' ? name : ''
}
