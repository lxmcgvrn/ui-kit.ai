import { expect, test } from 'vitest'

import { ColorPalette, DEFAULT_COLOR_PALETTE_INPUT } from '../palette'

// Pins the generated CSS, so a regression in any shade shows up as a diff.
test('ColorPalette.css', () => {
    const css = new ColorPalette(DEFAULT_COLOR_PALETTE_INPUT).css({
        overrideTwColors: true,
        selector: '@theme',
    })

    expect(css).toMatchSnapshot()
})
