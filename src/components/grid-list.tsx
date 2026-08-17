import type { GridListItemProps as RACGridListItemProps, GridListProps as RACGridListProps } from 'react-aria-components'

import { LucideGripVertical } from 'lucide-react'
import { composeRenderProps, Button as RACButton, GridList as RACGridList, GridListItem as RACGridListItem } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Checkbox } from './checkbox'
import { collectionRowButtonStyles, collectionRowStyles } from './styles/collection-row'

export interface GridListProps<T extends object = object> extends RACGridListProps<T> {}

/** A list of rows, each of them selectable and able to hold interactive content. */
export function GridList<T extends object>({ className, ...props }: GridListProps<T>) {
  return (
    <RACGridList
      {...props}
      className={composeRenderProps(className, (className) => twMerge('flex flex-col gap-0.5 outline-0', className))}
    />
  )
}
GridList.displayName = 'GridList'

export interface GridListItemProps<T extends object = object> extends RACGridListItemProps<T> {}

/** One row of a {@link GridList}, prepending drag and selection controls as needed. */
export function GridListItem<T extends object>({ children, className, ...props }: GridListItemProps<T>) {
  const textValue = props.textValue ?? (typeof children === 'string' ? children : undefined)

  return (
    <RACGridListItem
      {...props}
      className={composeRenderProps(className, (className) => twMerge(collectionRowStyles(), className))}
      textValue={textValue}
    >
      {composeRenderProps(children, (children, { allowsDragging, selectionBehavior, selectionMode }) => (
        <>
          {allowsDragging === true ? (
            <RACButton
              className={collectionRowButtonStyles()}
              slot='drag'
            >
              <LucideGripVertical aria-hidden />
            </RACButton>
          ) : null}

          {selectionBehavior === 'toggle' && selectionMode !== 'none' ? <Checkbox slot='selection' /> : null}

          <div className='flex min-w-0 flex-1 items-center gap-2'>{children}</div>
        </>
      ))}
    </RACGridListItem>
  )
}
GridListItem.displayName = 'GridListItem'
