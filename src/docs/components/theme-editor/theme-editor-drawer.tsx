'use client'

import {
    Button,
    Description,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@ui-kit.ai/components'

import { ColorsSection } from './colors-section'
import { CopyButton } from './copy-button'
import { SECTION_HEADING } from './field'
import { PresetSelect } from './preset-select'
import { RadiusSlider } from './radius-slider'
import { SettingSlider } from './setting-slider'
import { setThemeEditorOpen, useIsThemeEditorOpen } from './store'
import { useThemeInput } from './use-theme-input'

/** The site-wide theme editor: a right-hand drawer over the live page. */
export function ThemeEditorDrawer() {
    const isOpen = useIsThemeEditorOpen()
    const theme = useThemeInput()

    return (
        <Drawer
            // Wide enough to read a whole oklch value without scrolling the field.
            className='sm:w-[29rem]'
            isOpen={isOpen}
            onOpenChange={setThemeEditorOpen}
        >
            <DrawerHeader>
                <DrawerTitle>Theme editor</DrawerTitle>
                <DrawerCloseButton />
            </DrawerHeader>

            <DrawerContent className='flex flex-col gap-6'>
                <Description className='mb-0 w-full'>
                    Every change re-themes this whole site, live. Your theme is saved in this
                    browser.
                </Description>

                <PresetSelect
                    onChange={theme.selectPreset}
                    value={theme.preset}
                />

                <ColorsSection theme={theme} />

                <div className='flex flex-col gap-4'>
                    <h3 className={SECTION_HEADING}>Style</h3>

                    <RadiusSlider
                        onChange={theme.setRadius}
                        value={theme.radius}
                    />

                    <SettingSlider
                        label='Depth'
                        onChange={theme.setDepth}
                        value={theme.depth}
                    />

                    <SettingSlider
                        label='Saturation'
                        onChange={theme.setSaturation}
                        value={theme.saturation}
                    />
                </div>
            </DrawerContent>

            <DrawerFooter>
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
            </DrawerFooter>
        </Drawer>
    )
}
