import { tv } from 'tailwind-variants'

/** Row styling shared by the collection components that render selectable rows. */
export const collectionRowStyles = tv({
  base: [
    'group/row',
    'flex items-center gap-2',
    'text-hi-contrast text-sm',
    'cursor-default select-none',
    'rounded-sm px-2 py-1',
    'outline-0 -outline-offset-2',
    'transition-colors',
    'forced-color-adjust-none',
    // disabled
    'disabled:text-placeholder',
    // hover
    'hover:bg-tint',
    // focus
    'focus-visible:bg-tint',
    // pressed
    'pressed:bg-tint',
    // selected
    'selected:bg-tint',
    // current page, for rows that navigate
    'data-current:bg-tint',
    // drag and drop
    'dragging:opacity-50',
    'drop-target:bg-tint',
  ],
})

/** Styling for the small icon buttons that sit inside a collection row. */
export const collectionRowButtonStyles = tv({
  base: [
    'flex shrink-0 items-center justify-center',
    'size-4 rounded-sm',
    'text-lo-contrast',
    'cursor-pointer',
    '[&_svg]:size-3 [&_svg]:shrink-0',
    // hover
    'hover:text-hi-contrast',
  ],
})
