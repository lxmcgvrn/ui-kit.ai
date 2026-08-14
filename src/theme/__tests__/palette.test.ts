import { expect, test } from 'vitest'

import { DEFAULT_THEME, themeCss } from '../index'

// Pins the generated CSS, so a regression in any shade shows up as a diff.
test('themeCss', () => {
    expect(themeCss(DEFAULT_THEME)).toMatchSnapshot()
})
