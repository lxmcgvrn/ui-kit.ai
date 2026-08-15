'use client'

import { DialogTrigger, FieldButton, Popover, PopoverDialog } from '@ui-kit.ai/components'
import { LucidePipette } from 'lucide-react'

import { ColorPickerPanel } from './color-picker-panel'

export interface ColorPickerButtonProps {
    /** Borders are translucent by design, so those colors get an opacity section. */
    hasAlpha: boolean
    label: string

    /** Fires on a selection, and never on opening or closing the popover. */
    onChange: (color: string) => void
    value: string
}

/** A pipette that opens the full picker over the current color. */
export function ColorPickerButton({ hasAlpha, label, onChange, value }: ColorPickerButtonProps) {
    return (
        <DialogTrigger>
            {/* `null` opts out of the surrounding field's own button slots. */}
            <FieldButton
                aria-label={`Pick ${label}`}
                slot={null}
            >
                <LucidePipette />
            </FieldButton>

            <Popover>
                <PopoverDialog className='w-72'>
                    <ColorPickerPanel
                        hasAlpha={hasAlpha}
                        onChange={onChange}
                        value={value}
                    />
                </PopoverDialog>
            </Popover>
        </DialogTrigger>
    )
}
