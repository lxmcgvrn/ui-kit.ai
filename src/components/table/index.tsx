import type {
    CellProps as RACCellProps,
    ColumnProps as RACColumnProps,
    ResizableTableContainerProps as RACResizableTableContainerProps,
    RowProps as RACRowProps,
    SortDirection as RACSortDirection,
    TableBodyProps as RACTableBodyProps,
    TableHeaderProps as RACTableHeaderProps,
    TableProps as RACTableProps,
} from 'react-aria-components'

import { LucideArrowUp, LucideArrowUpDown } from 'lucide-react'
import {
    Button as RACButton,
    Cell as RACCell,
    Collection as RACCollection,
    Column as RACColumn,
    // ColumnResizer as RACColumnResizer,
    Group as RACGroup,
    Row as RACRow,
    Table as RACTable,
    TableBody as RACTableBody,
    ResizableTableContainer as RACTableContainer,
    TableHeader as RACTableHeader,
    useTableOptions,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Checkbox } from '../checkbox'
import { Skeleton } from '../skeleton'

const getRandomNumber = (min: number = 0, max: number = 100): number => {
    return Math.floor(min + Math.random() * (max - min + 1))
}

const columnWrapperStyles = tv({
    base: [
        'border-default border-b',
        '[&:focus-within]:z-20 [&:hover]:z-20',
        'text-lo-contrast hover:text-hi-contrast',
        'align-bottom',
        'cursor-default hover:cursor-pointer',
    ],
})

const columnStyles = tv({
    base: [
        'text-sm',
        'text-start',
        'px-4 py-2',
        'group-data-[compact]/table:first:pl-0 group-data-[compact]/table:last:pr-0',
        'font-semibold',
        'flex flex-1 items-center gap-1',
        '-outline-offset-2',
    ],
    variants: {
        alignment: {
            center: 'justify-center',
            end: 'justify-end',
            start: 'justify-start',
        },
    },
})

const cellStyles = tv({
    base: [
        'text-sm',
        'px-4 py-2',
        'transition-colors',
        '-outline-offset-2',
        'group-data-[compact]/table:first:pl-0 group-data-[compact]/table:last:pr-0',
        // border styles
        'border-default border-b group-last/row:border-b-0',
    ],
    defaultVariants: {
        alignment: 'start',
    },
    variants: {
        alignment: {
            center: 'text-center',
            end: 'text-end',
            start: 'text-start',
        },
    },
})

const rowStyles = tv({
    base: [
        'group/row',
        'w-full',
        'relative -outline-offset-2',
        'text-hi-contrast disabled:text-placeholder',
        'transition-colors',
        // hover styles
        'hover:bg-tint hover:select-none',
        'hover:cursor-pointer hover:disabled:cursor-not-allowed',
        // pressed styles
        'pressed:bg-tint',
        // selected styles
        'selected:select-none',
        'selected:bg-tint',
    ],
})

const cellSkeletonStyles = tv({
    base: 'max-w-[50%]',
    defaultVariants: {
        alignment: 'start',
    },
    variants: {
        alignment: {
            center: 'mx-auto',
            end: 'ml-auto',
            start: '',
        },
    },
})

// const resizerStyles = tv({
//     base: [
//         `bg-mid-contrast resizing:w-[2px] resizing:bg-primary-hover resizing:pl-[7px]
//     forced-colors:resizing:bg-[Highlight] box-content h-5 w-px translate-x-[8px] cursor-col-resize
//     rounded bg-clip-content px-[8px] py-1 -outline-offset-2 forced-colors:bg-[ButtonBorder]`,
//     ],
//     extend: focusRing,
// })

/**
 * Props accepted by {@link Cell}. Everything `react-aria-components`' `Cell`
 * accepts, plus this design system's presentational props.
 */
export interface CellProps extends RACCellProps {
    /**
     * Horizontal alignment of the cell's content. Should match the alignment of
     * the {@link Column} it belongs to.
     */
    alignment?: 'center' | 'end' | 'start'
    /**
     * When `true`, a {@link Skeleton} is rendered in place of the cell's children.
     */
    showSkeleton?: boolean
}

export function Cell({ alignment, children, className, showSkeleton, ...props }: CellProps) {
    return (
        <RACCell
            {...props}
            className={(rp) =>
                twMerge(
                    cellStyles({ alignment }),
                    typeof className === 'function' ? className(rp) : className
                )
            }
        >
            {showSkeleton === true ? (
                <Skeleton
                    className={cellSkeletonStyles({
                        alignment,
                    })}
                    style={{
                        width: `${getRandomNumber(20, 50)}%`,
                    }}
                />
            ) : (
                children
            )}
        </RACCell>
    )
}
Cell.displayName = 'Cell'

/**
 * Props accepted by {@link Column}. Everything `react-aria-components`'
 * `Column` accepts, plus this design system's presentational props.
 */
export interface ColumnProps extends RACColumnProps {
    /**
     * Horizontal alignment of the column's content.
     */
    alignment?: 'center' | 'end' | 'start'
}

export function Column({ alignment, children, className, textValue, ...props }: ColumnProps) {
    return (
        <RACColumn
            {...props}
            className={columnWrapperStyles()}
            textValue={textValue}
        >
            {(renderProps) => (
                <div className='flex items-center'>
                    <RACGroup
                        className={() =>
                            twMerge(
                                columnStyles({ alignment }),
                                typeof className === 'function'
                                    ? className({ ...renderProps, defaultClassName: '' })
                                    : className
                            )
                        }
                        role='presentation'
                        tabIndex={-1}
                    >
                        <span className='inline-flex items-center truncate'>
                            {typeof children === 'function'
                                ? children(renderProps)
                                : (children ?? textValue)}
                        </span>

                        {renderProps.allowsSorting ? (
                            <ColumnSortControl sortDirection={renderProps.sortDirection} />
                        ) : null}
                    </RACGroup>

                    {/* {props.width != null && <RACColumnResizer className={resizerStyles()} />} */}
                </div>
            )}
        </RACColumn>
    )
}
Column.displayName = 'Column'

function ColumnSortControl({ sortDirection }: { sortDirection: RACSortDirection | undefined }) {
    return (
        <span
            className={twMerge(
                'flex items-center justify-center',
                'size-3',
                'transition-opacity',
                'forced-colors:text-[ButtonText]',
                sortDirection === 'descending' ? 'rotate-180' : null,
                !sortDirection ? 'opacity-50' : null
            )}
        >
            {sortDirection ? <LucideArrowUp aria-hidden /> : <LucideArrowUpDown aria-hidden />}
        </span>
    )
}
ColumnSortControl.displayName = 'ColumnSortControl'

export function ResizableTableContainer(props: RACResizableTableContainerProps) {
    return (
        <RACTableContainer
            {...props}
            className={twMerge(
                'relative',
                'w-full',
                'scrollbar-thin overflow-auto',
                props.className
            )}
        />
    )
}
ResizableTableContainer.displayName = 'ResizableTableContainer'

/**
 * Props accepted by {@link Row}.
 */
export interface RowProps<TColumn extends object = object> extends RACRowProps<TColumn> {}

export function Row<TColumn extends object>({
    children,
    className,
    columns,
    id,
    ...props
}: RowProps<TColumn>) {
    const { allowsDragging, selectionBehavior } = useTableOptions()

    return (
        <RACRow
            id={id}
            {...props}
            className={(rp) =>
                twMerge(rowStyles(), typeof className === 'function' ? className(rp) : className)
            }
        >
            {allowsDragging && (
                <Cell
                    alignment='center'
                    className='px-2'
                >
                    <RACButton slot='drag'>≡</RACButton>
                </Cell>
            )}

            {selectionBehavior === 'toggle' && (
                <Cell
                    alignment='center'
                    className='px-2'
                >
                    <Checkbox slot='selection' />
                </Cell>
            )}
            <RACCollection items={columns}>{children}</RACCollection>
        </RACRow>
    )
}
Row.displayName = 'Row'

/**
 * Props accepted by {@link Table}. Everything `react-aria-components`' `Table`
 * accepts, plus this design system's presentational props.
 */
export interface TableProps extends RACTableProps {
    /**
     * When `true`, the table's outer horizontal padding is removed so its
     * content aligns with the surrounding container.
     */
    isCompact?: boolean
}

/**
 * A table displays data in rows and columns and enables a user to navigate its
 * contents via directional navigation keys, and optionally supports row
 * selection and sorting.
 */
export function Table({ className, isCompact, ...props }: TableProps) {
    return (
        <RACTable
            {...props}
            className={(rp) =>
                twMerge(
                    'group/table w-full border-separate border-spacing-0 focus:outline-0',
                    typeof className === 'function' ? className(rp) : className
                )
            }
            data-compact={isCompact}
        />
    )
}
Table.displayName = 'Table'

/**
 * Props accepted by {@link TableBody}.
 */
export interface TableBodyProps<T extends object = object> extends RACTableBodyProps<T> {}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
    return <RACTableBody<T> {...props} />
}
TableBody.displayName = 'TableBody'

/**
 * Props accepted by {@link TableHeader}.
 */
export interface TableHeaderProps<TColumn extends object = object>
    extends RACTableHeaderProps<TColumn> {}

export function TableHeader<TColumn extends object>({ ...props }: TableHeaderProps<TColumn>) {
    const { allowsDragging, selectionBehavior, selectionMode } = useTableOptions()

    return (
        <RACTableHeader {...props}>
            {allowsDragging && (
                <Column
                    alignment='center'
                    className='px-2'
                    id='drag'
                    textValue=''
                    width={32}
                />
            )}

            {selectionBehavior === 'toggle' ? (
                <Column
                    alignment='center'
                    id='selection'
                    minWidth={32}
                    width={32}
                >
                    {selectionMode === 'multiple' ? <Checkbox slot='selection' /> : null}
                </Column>
            ) : null}

            <RACCollection items={props.columns}>{props.children}</RACCollection>
        </RACTableHeader>
    )
}
TableHeader.displayName = 'TableHeader'
