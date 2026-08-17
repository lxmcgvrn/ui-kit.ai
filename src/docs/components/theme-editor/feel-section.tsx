'use client'

import type { ThemeSetting } from '@ui-kit.ai/theme'
import type { Selection as RACSelection } from 'react-aria-components'

import { Label, ToggleButton, ToggleButtonGroup } from '@ui-kit.ai/components'
import { THEME_SETTINGS } from '@ui-kit.ai/theme'
import { LucideContrast, LucideLayers2, LucideSpline } from 'lucide-react'

import type { ThemeEditorController } from './use-theme-input'

import { SettingRow, useLabelId } from './setting-row'

const STOP_LABELS: Record<ThemeSetting, string> = { lots: 'Lots', none: 'None', some: 'Some' }

/** The three style knobs, each a three-stop toggle group. */
export function FeelSection({ theme }: { theme: ThemeEditorController }) {
  return (
    <div className='mt-6'>
      <h3 className='text-lo-contrast mb-3 text-xs font-semibold tracking-widest uppercase'>Feel</h3>

      <div className='flex flex-col gap-2'>
        <SettingRow icon={<LucideSpline />}>
          <Label className='mb-0'>Radius</Label>

          <ToggleButtonGroupSetting
            onChange={theme.setRadius}
            value={theme.radius}
          />
        </SettingRow>

        <SettingRow icon={<LucideLayers2 />}>
          <Label className='mb-0'>Depth</Label>

          <ToggleButtonGroupSetting
            onChange={theme.setDepth}
            value={theme.depth}
          />
        </SettingRow>

        <SettingRow icon={<LucideContrast />}>
          <Label className='mb-0'>Saturation</Label>

          <ToggleButtonGroupSetting
            onChange={theme.setSaturation}
            value={theme.saturation}
          />
        </SettingRow>
      </div>
    </div>
  )
}

function isThemeSetting(value: string): value is ThemeSetting {
  return (THEME_SETTINGS as readonly string[]).includes(value)
}

/** None, Some or Lots — the three stops every feel knob offers. */
function ToggleButtonGroupSetting({ onChange, value }: { onChange: (setting: ThemeSetting) => void; value: ThemeSetting }) {
  const labelId = useLabelId()

  const onSelectionChange = (keys: RACSelection) => {
    if (keys === 'all') return

    const [key] = keys
    if (typeof key === 'string' && isThemeSetting(key)) onChange(key)
  }

  return (
    <ToggleButtonGroup
      aria-labelledby={labelId}
      className='ml-auto'
      disallowEmptySelection
      isAttached
      onSelectionChange={onSelectionChange}
      selectedKeys={[value]}
      selectionMode='single'
    >
      {THEME_SETTINGS.map((setting) => (
        <ToggleButton
          id={setting}
          key={setting}
        >
          {STOP_LABELS[setting]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
