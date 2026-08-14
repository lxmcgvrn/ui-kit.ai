import { expect, test } from 'vitest'

import { DEFAULT_THEME, THEME_SETTINGS, themeCss } from '../index'

// Pins the generated CSS, so a regression in any shade shows up as a diff.
test.each(THEME_SETTINGS)('themeCss at depth %s', (depth) => {
    expect(themeCss({ ...DEFAULT_THEME, depth })).toMatchSnapshot()
})

test.each(THEME_SETTINGS)('themeCss at saturation %s', (saturation) => {
    expect(themeCss({ ...DEFAULT_THEME, saturation })).toMatchSnapshot()
})
