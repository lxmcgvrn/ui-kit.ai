'use client'

import type { ReactNode } from 'react'

import { useId, useMemo } from 'react'
import { LabelContext as RACLabelContext, useSlottedContext } from 'react-aria-components'
import { tv } from 'tailwind-variants'

const rowStyles = tv({
    slots: {
        icon: 'text-lo-contrast flex w-(--height-ui-element) flex-none justify-center [&_svg]:size-4',

        // The row's `Label` sits beside its control, not stacked above a field.
        row: ['flex min-h-8 items-center gap-2'],
    },
})

/** A drawer row: an icon, a `Label`, and the control that label names. */
export function SettingRow({ children, icon }: { children: ReactNode; icon: ReactNode }) {
    const styles = rowStyles()
    const id = useId()
    const label = useMemo(() => ({ id }), [id])

    /* The row owns the label's id, so a control beside the label can claim it. */
    return (
        <RACLabelContext value={label}>
            <div className={styles.row()}>
                <span className={styles.icon()}>{icon}</span>

                {children}
            </div>
        </RACLabelContext>
    )
}

/** The row's label, for controls react-aria hands no label slot of their own. */
export function useLabelId() {
    return useSlottedContext(RACLabelContext)?.id
}
