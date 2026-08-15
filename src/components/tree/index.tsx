import type { ReactNode } from 'react'
import type {
    TreeItemProps as RACTreeItemProps,
    TreeProps as RACTreeProps,
} from 'react-aria-components'

import { LucideChevronRight, LucideGripVertical } from 'lucide-react'
import {
    composeRenderProps,
    Button as RACButton,
    Tree as RACTree,
    TreeItem as RACTreeItem,
    TreeItemContent as RACTreeItemContent,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Checkbox } from '../checkbox'
import { collectionRowButtonStyles, collectionRowStyles } from '../styles/collection-row'

/** RAC sets `--tree-item-level` on every row, starting at 1. */
const INDENT = 'ps-[calc((var(--tree-item-level)_-_1)*1.25rem)]'

export interface TreeProps<T extends object = object> extends RACTreeProps<T> {}

/** Nested rows a user can expand, collapse, and select. */
export function Tree<T extends object>({ className, ...props }: TreeProps<T>) {
    return (
        <RACTree
            {...props}
            className={composeRenderProps(className, (className) =>
                twMerge('flex flex-col gap-0.5 outline-0', className)
            )}
        />
    )
}
Tree.displayName = 'Tree'

export interface TreeItemProps<T extends object = object>
    extends Omit<RACTreeItemProps<T>, 'children'> {
    /** Nested `TreeItem` elements; their presence is what grows the chevron. */
    children?: ReactNode

    /** The row's own content, rendered beside the chevron and the checkbox. */
    title: ReactNode
}

/** One row of a {@link Tree}; nest `TreeItem` elements inside it to go deeper. */
export function TreeItem<T extends object>({
    children,
    className,
    title,
    ...props
}: TreeItemProps<T>) {
    return (
        <RACTreeItem
            {...props}
            className={composeRenderProps(className, (className) =>
                twMerge(collectionRowStyles(), INDENT, className)
            )}
        >
            <RACTreeItemContent>
                {({ allowsDragging, hasChildItems, selectionBehavior, selectionMode }) => (
                    <div className='flex min-w-0 flex-1 items-center gap-2'>
                        {allowsDragging === true ? (
                            <RACButton
                                className={collectionRowButtonStyles()}
                                slot='drag'
                            >
                                <LucideGripVertical aria-hidden />
                            </RACButton>
                        ) : null}

                        {hasChildItems ? (
                            <RACButton
                                className={collectionRowButtonStyles()}
                                slot='chevron'
                            >
                                <LucideChevronRight
                                    aria-hidden
                                    className='group-expanded/row:rotate-90 transition-transform ease-out'
                                />
                            </RACButton>
                        ) : (
                            <span
                                aria-hidden
                                className='size-4 shrink-0'
                            />
                        )}

                        {selectionBehavior === 'toggle' && selectionMode !== 'none' ? (
                            <Checkbox slot='selection' />
                        ) : null}

                        <span className='flex-1 truncate'>{title}</span>
                    </div>
                )}
            </RACTreeItemContent>

            {children}
        </RACTreeItem>
    )
}
TreeItem.displayName = 'TreeItem'
