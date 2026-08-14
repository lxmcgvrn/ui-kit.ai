'use client'

import type { OptionsSchema } from '@ui-kit.ai/components'

import {
    Button,
    ColorSwatch,
    Description,
    DialogCloseButton,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Label,
    Select,
    SelectButton,
} from '@ui-kit.ai/components'
import { INTENTS, PRESETS } from '@ui-kit.ai/theme'
import {
    Dialog as RACDialog,
    Modal as RACModal,
    ModalOverlay as RACModalOverlay,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { CopyButton } from './copy-button'
import { DepthSlider } from './depth-slider'
import { RadiusSlider } from './radius-slider'
import { SaturationSlider } from './saturation-slider'
import { SeedColorField } from './seed-color-field'
import { setThemeEditorOpen, useIsThemeEditorOpen } from './store'
import { TokenPreview } from './token-preview'
import { CUSTOM_PRESET, useThemeInput } from './use-theme-input'

/* No scrim: the page behind the drawer *is* the preview, so it stays legible. */
const overlayStyles = tv({
    base: ['fixed inset-0 z-50', 'h-dvh w-dvw', 'exiting:pointer-events-none'],
})

const panelStyles = tv({
    base: [
        'fixed inset-y-0 right-0',
        'h-dvh w-full sm:w-[24rem]',
        'transition-transform duration-200',
        'entering:translate-x-full entering:ease-out',
        'exiting:translate-x-full exiting:ease-in',
        'exiting:pointer-events-none',
    ],
})

const dialogStyles = tv({
    base: [
        'group/dialog',
        'flex h-full flex-col',
        'text-left !outline-0',
        'bg-base-raised text-hi-contrast',
        'border-default border-l shadow-2xl',
        'forced-colors:bg-[Canvas]',
    ],
})

const PRESET_ITEMS: OptionsSchema<'listbox'>[] = [
    { id: CUSTOM_PRESET, textValue: 'Custom' },
    ...PRESETS.map((preset) => ({
        icon: (
            <ColorSwatch
                className='size-4'
                color={preset.input.colors.default}
            />
        ),
        id: preset.name,
        textValue: preset.label,
    })),
]

/** The site-wide theme editor: a right-hand drawer over the live page. */
export function ThemeEditorDrawer() {
    const isOpen = useIsThemeEditorOpen()
    const theme = useThemeInput()

    return (
        <RACModalOverlay
            className={overlayStyles()}
            isDismissable
            isOpen={isOpen}
            onOpenChange={setThemeEditorOpen}
        >
            <RACModal className={panelStyles()}>
                <RACDialog className={dialogStyles()}>
                    <DialogHeader>
                        <DialogTitle>Theme editor</DialogTitle>
                        <DialogCloseButton />
                    </DialogHeader>

                    <DialogContent className='flex flex-col gap-6'>
                        <Description className='mb-0 w-full'>
                            Every change re-themes this whole site, live. Your theme is saved in
                            this browser.
                        </Description>

                        <Select
                            className='grid grid-cols-[5rem_1fr] items-center gap-3'
                            items={PRESET_ITEMS}
                            onSelectionChange={(key) => {
                                theme.selectPreset(String(key))
                            }}
                            selectedKey={theme.preset}
                        >
                            <Label className='mb-0'>Preset</Label>
                            <SelectButton />
                        </Select>

                        <div className='flex flex-col gap-3'>
                            {INTENTS.map((intent) => (
                                <SeedColorField
                                    key={intent}
                                    label={toLabel(intent)}
                                    onChange={(color) => {
                                        theme.setColor(intent, color)
                                    }}
                                    value={theme.input.colors[intent]}
                                />
                            ))}
                        </div>

                        <RadiusSlider
                            onChange={theme.setRadius}
                            value={theme.input.radius}
                        />

                        <DepthSlider
                            onChange={theme.setDepth}
                            value={theme.depth}
                        />

                        <SaturationSlider
                            onChange={theme.setSaturation}
                            value={theme.saturation}
                        />

                        <TokenPreview />
                    </DialogContent>

                    <DialogFooter>
                        <Button
                            isDisabled={!theme.isOverridden}
                            onPress={theme.reset}
                            variant='tertiary'
                        >
                            Reset
                        </Button>
                        <div className='flex gap-2'>
                            <CopyButton getValue={theme.css}>CSS</CopyButton>
                            <CopyButton getValue={theme.json}>JSON</CopyButton>
                        </div>
                    </DialogFooter>
                </RACDialog>
            </RACModal>
        </RACModalOverlay>
    )
}

function toLabel(intent: string) {
    return intent.charAt(0).toUpperCase() + intent.slice(1)
}
