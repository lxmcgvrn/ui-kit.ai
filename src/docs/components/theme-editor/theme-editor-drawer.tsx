'use client'

import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@ui-kit.ai/components'
import { tv } from 'tailwind-variants'

import { ColourTree } from './colour-tree'
import { FeelSection } from './feel-section'
import { PresetChips } from './preset-chips'
import { SchemeTabs } from './scheme-tabs'
import { setThemeEditorOpen, useIsThemeEditorOpen } from './store'
import { ThemeEditorFooter } from './theme-editor-footer'
import { useColorScheme } from './use-color-scheme'
import { useThemeInput } from './use-theme-input'

const drawerStyles = tv({
    slots: {
        heading: 'text-lo-contrast text-xs font-semibold tracking-widest uppercase',
        sectionHead: 'mb-3 flex items-center justify-between gap-3',
    },
})

/** The site-wide theme editor: a right-hand drawer over the live page. */
export function ThemeEditorDrawer() {
    const isOpen = useIsThemeEditorOpen()
    const theme = useThemeInput()
    const { scheme, selectScheme } = useColorScheme()
    const { heading, sectionHead } = drawerStyles()

    return (
        <Drawer
            aria-label='Theme editor'
            className='sm:w-md'
            isOpen={isOpen}
            onOpenChange={setThemeEditorOpen}
        >
            <DrawerHeader>
                <DrawerTitle>Theme editor</DrawerTitle>
                <DrawerCloseButton />
            </DrawerHeader>

            <DrawerContent>
                <div className={sectionHead()}>
                    <h3 className={heading()}>Colour</h3>

                    <SchemeTabs
                        onSchemeChange={selectScheme}
                        scheme={scheme}
                    />
                </div>

                <PresetChips theme={theme} />

                <ColourTree
                    controller={theme}
                    scheme={scheme}
                />

                <FeelSection theme={theme} />
            </DrawerContent>

            <ThemeEditorFooter theme={theme} />
        </Drawer>
    )
}
