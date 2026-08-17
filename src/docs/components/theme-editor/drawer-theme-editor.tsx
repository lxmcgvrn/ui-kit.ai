'use client'

import type { Scheme } from '@ui-kit.ai/theme'
import type { ReactElement } from 'react'

import {
  Button,
  ButtonCopy,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Tab,
  TabList,
  Tabs,
  Tooltip,
  TooltipTrigger,
} from '@ui-kit.ai/components'
import { LucideRedo2, LucideRotateCcw, LucideUndo2 } from 'lucide-react'
import { useTheme } from 'next-themes'

import type { ThemeEditorController } from './use-theme-input'

import { ColorTree } from './color-tree'
import { FeelSection } from './feel-section'
import { PresetChips } from './preset-chips'
import { setThemeEditorOpen, useIsThemeEditorOpen } from './store'
import { useThemeInput } from './use-theme-input'

const SCHEMES: readonly { label: string; value: Scheme }[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
]

/** The site-wide theme editor: a right-hand drawer over the live page. */
export function DrawerThemeEditor() {
  const isOpen = useIsThemeEditorOpen()
  const theme = useThemeInput()
  const { resolvedTheme, setTheme } = useTheme()

  const scheme: Scheme = resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <Drawer
      className='sm:w-md'
      isOpen={isOpen}
      onOpenChange={setThemeEditorOpen}
    >
      <DrawerHeader>
        <DrawerTitle>Theme editor</DrawerTitle>
        <DrawerCloseButton />
      </DrawerHeader>

      <DrawerContent>
        <div className='mb-3 flex items-center justify-between gap-3'>
          <h3 className='text-lo-contrast text-xs font-semibold tracking-widest uppercase'>Color</h3>

          <TabsLightDarkMode
            onSchemeChange={setTheme}
            scheme={scheme}
          />
        </div>

        <PresetChips theme={theme} />

        <ColorTree
          controller={theme}
          scheme={scheme}
        />

        <FeelSection theme={theme} />
      </DrawerContent>

      <DrawerFooterThemeEditor theme={theme} />
    </Drawer>
  )
}

/* No `disabled`: it blocks hover and focus, hiding the tooltip that explains why. */
function ButtonHistoryPlaceholder({ icon, tooltip }: { icon: ReactElement; tooltip: string }) {
  return (
    <TooltipTrigger delay={200}>
      <Button
        aria-label={tooltip}
        className='cursor-default opacity-50'
        isIcon
        variant='secondary'
      >
        {icon}
      </Button>

      <Tooltip>{tooltip}</Tooltip>
    </TooltipTrigger>
  )
}

/** History and reset on the left; CSS and JSON export on the right. */
function DrawerFooterThemeEditor({ theme }: { theme: ThemeEditorController }) {
  return (
    <DrawerFooter>
      <div className='flex items-center gap-2'>
        <ButtonHistoryPlaceholder
          icon={<LucideUndo2 />}
          tooltip='Nothing to undo yet'
        />
        <ButtonHistoryPlaceholder
          icon={<LucideRedo2 />}
          tooltip='Nothing to redo'
        />

        <TooltipTrigger delay={200}>
          <Button
            aria-label='Reset to the shipped theme'
            isIcon
            onPress={theme.reset}
            variant='secondary'
          >
            <LucideRotateCcw />
          </Button>

          <Tooltip>Reset to the shipped theme</Tooltip>
        </TooltipTrigger>
      </div>

      <div className='flex items-center gap-2'>
        {/* CSS reads as the secondary action; JSON carries the theme's accent. */}
        <TooltipTrigger delay={200}>
          <ButtonCopy
            aria-label='Copy CSS'
            getValue={theme.css}
            variant='secondary'
          />

          <Tooltip>Copy CSS</Tooltip>
        </TooltipTrigger>

        <TooltipTrigger delay={200}>
          <ButtonCopy
            aria-label='Copy JSON'
            getValue={theme.json}
            variant='primary'
          />

          <Tooltip>Copy JSON</Tooltip>
        </TooltipTrigger>
      </div>
    </DrawerFooter>
  )
}

/** Flips the site's color scheme — the drawer previews whichever one it edits. */
function TabsLightDarkMode({ onSchemeChange, scheme }: { onSchemeChange: (scheme: Scheme) => void; scheme: Scheme }) {
  return (
    <Tabs
      onSelectionChange={(key) => {
        onSchemeChange(key === 'dark' ? 'dark' : 'light')
      }}
      selectedKey={scheme}
      variant='segmented'
    >
      <TabList aria-label='Color scheme'>
        {SCHEMES.map(({ label, value }) => (
          <Tab
            id={value}
            key={value}
          >
            {label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  )
}
