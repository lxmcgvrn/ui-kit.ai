import type { HTMLAttributes, ReactElement } from 'react'

import { cloneElement } from 'react'
import { twMerge } from 'tailwind-merge'

export enum Slot {
    LEFT = 'slot-left',
    RIGHT = 'slot-right',
}

export type SlotNode = ReactElement<SlotNodeProps>

export type SlotNodeProps = HTMLAttributes<HTMLElement> & Record<`data-${string}`, unknown>

export function renderSlot(node: SlotNode | undefined, props: SlotNodeProps) {
    if (!node) return null

    const nodeProps = node.props

    return cloneElement(node, {
        ...nodeProps,
        ...props,
        className: twMerge(nodeProps.className, props.className),
    })
}
