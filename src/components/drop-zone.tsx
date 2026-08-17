import type { DropZoneProps as RACDropZoneProps, TextProps as RACTextProps } from 'react-aria-components'

import { composeRenderProps, DropZone as RACDropZone, Text as RACText } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const dropZoneStyles = tv({
  base: [
    'w-full',
    'p-6',
    'flex flex-col items-center justify-center gap-2',
    'text-center text-balance',
    'text-lo-contrast text-base',
    'rounded-sm',
    'border-field border border-dashed',
    'transition-colors',
    // Scoped to direct children, so a button's own icon keeps its size.
    '[&>svg]:size-8 [&>svg]:shrink-0 [&>svg]:[&>*]:stroke-[1.5]',
    // hover
    'hover:border-field-hover',
    // drop target
    'drop-target:border-solid',
    'drop-target:border-field-hover',
    'drop-target:bg-tint',
    'drop-target:forced-colors:border-[Highlight]',
    // disabled
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'disabled:hover:border-field',
  ],
})

export interface DropZoneProps extends RACDropZoneProps {}

/** An area that accepts files or objects dropped onto it. */
export function DropZone(props: DropZoneProps) {
  return (
    <RACDropZone
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge(dropZoneStyles(), className))}
    />
  )
}
DropZone.displayName = 'DropZone'

export interface DropZoneLabelProps extends RACTextProps {}

/** The visible label for a {@link DropZone}, also announced as its accessible name. */
export function DropZoneLabel(props: DropZoneLabelProps) {
  return (
    <RACText
      {...props}
      className={twMerge('text-hi-contrast text-base font-medium', props.className)}
      slot='label'
    />
  )
}
DropZoneLabel.displayName = 'DropZoneLabel'
