import { expect, test } from 'vitest'

import { DEFAULT_THEME, DEPTHS, SATURATIONS, themeCss } from '../index'

// Pins the generated CSS, so a regression in any shade shows up as a diff.
test.each(DEPTHS)('themeCss at depth %s', (depth) => {
    expect(themeCss({ ...DEFAULT_THEME, depth })).toMatchSnapshot()
})

test.each(SATURATIONS)('themeCss at saturation %s', (saturation) => {
    expect(themeCss({ ...DEFAULT_THEME, saturation })).toMatchSnapshot()
})
