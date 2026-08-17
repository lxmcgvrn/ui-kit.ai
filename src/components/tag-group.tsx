import type { TagGroupProps as RACTagGroupProps, TagListProps as RACTagListProps, TagProps as RACTagProps } from 'react-aria-components'

import { LucideX } from 'lucide-react'
import {
  composeRenderProps,
  Button as RACButton,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  TagList as RACTagList,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { Intent } from './types/intent'

import { renderSlot, Slot, type SlotNode } from './types/slotted-node'

const tagGroupItemStyles = tv({
  base: [
    'h-6 min-w-6',
    'text-center text-sm font-medium',
    'inline-flex shrink-0 items-center justify-center gap-1.5',
    'rounded-full border',
    'bg-tint/80 border-field text-lo-contrast',
    'cursor-default select-none',
    'transition-colors',
    'outline outline-0',
    '[&_svg]:size-3 [&_svg]:shrink-0',
    // padding
    'px-3 py-1.5',
    '[&:has([data-slot=slot-left])]:pl-1.5',
    'allows-removing:pr-1.5',
    // hover and press, where the tag responds to them
    'selection-single:cursor-pointer selection-multiple:cursor-pointer',
    'selection-single:hover:bg-tint selection-multiple:hover:bg-tint',
    'selection-single:hover:border-field-hover selection-multiple:hover:border-field-hover',
    'pressed:bg-tint',
    // selected
    'selected:surface-primary',
    // disabled
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
})

const removeButtonStyles = tv({
  base: [
    'flex shrink-0 items-center justify-center',
    'size-4 rounded-full',
    'cursor-pointer opacity-60',
    'transition-opacity',
    // hover
    'hover:opacity-100',
  ],
})

export interface TagGroupProps extends RACTagGroupProps {}

/** A focusable list of tags, with keyboard navigation, selection, and removal. */
export function TagGroup({ children, className, ...props }: TagGroupProps) {
  return (
    <RACTagGroup
      {...props}
      className={twMerge('flex flex-col gap-1.5', className)}
    >
      {children}
    </RACTagGroup>
  )
}
TagGroup.displayName = 'TagGroup'

export interface TagListProps<T extends object = object> extends RACTagListProps<T> {}

/** Holds the tags inside a {@link TagGroup}, wrapping them onto new lines. */
export function TagList<T extends object>({ className, ...props }: TagListProps<T>) {
  return (
    <RACTagList
      {...props}
      className={composeRenderProps(className, (className) =>
        twMerge('flex flex-wrap items-center gap-1.5 outline-0', 'empty:text-lo-contrast empty:text-sm', className)
      )}
    />
  )
}
TagList.displayName = 'TagList'

export interface TagGroupItemProps extends RACTagProps {
  /** Convey semantic meaning with color. */
  intent?: Intent

  /** Decorative node (e.g. an icon) rendered on the left. */
  slotLeft?: SlotNode
}

/** One tag within a {@link TagList}; grows a remove button alongside `onRemove`. */
export function TagGroupItem({ children, className, intent, slotLeft, ...props }: TagGroupItemProps) {
  const textValue = props.textValue ?? (typeof children === 'string' ? children : undefined)

  return (
    <RACTag
      {...props}
      className={composeRenderProps(className, (className) => twMerge(tagGroupItemStyles(), intent, className))}
      textValue={textValue}
    >
      {composeRenderProps(children, (children, { allowsRemoving }) => (
        <>
          {renderSlot(slotLeft, {
            'data-slot': Slot.LEFT,
          })}
          {children}

          {allowsRemoving ? (
            <RACButton
              className={removeButtonStyles()}
              slot='remove'
            >
              <LucideX aria-hidden />
            </RACButton>
          ) : null}
        </>
      ))}
    </RACTag>
  )
}
TagGroupItem.displayName = 'TagGroupItem'
