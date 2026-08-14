import type { Oklch } from 'culori'

import { converter } from 'culori'
import { expect, test } from 'vitest'

import { apcaLc } from '../apca'

/** The published APCA-W3 0.1.9 checks, which exercise every constant. */
const CHECKS = [
    { background: '#fff', expected: 63.056469930209424, text: '#888' },
    { background: '#888', expected: -68.54146436644962, text: '#fff' },
    { background: '#aaa', expected: 58.146262578561334, text: '#000' },
    { background: '#000', expected: -56.24113336839742, text: '#aaa' },
    { background: '#def', expected: 91.66830811481631, text: '#123' },
    { background: '#123', expected: -93.06770049484275, text: '#def' },
    { background: '#444', expected: 8.32326136957393, text: '#123' },
    { background: '#123', expected: -7.526878460278154, text: '#444' },
]

const toOklch = converter('oklch')

test.each(CHECKS)('$text on $background scores Lc $expected', ({ background, expected, text }) => {
    // The hex round-trip through oklch loses a little in the last places.
    expect(apcaLc(oklch(text), oklch(background))).toBeCloseTo(expected, 4)
})

test('a color against itself scores nothing', () => {
    expect(apcaLc(oklch('#7f7f7f'), oklch('#7f7f7f'))).toBe(0)
})

function oklch(color: string): Oklch {
    const parsed = toOklch(color)
    if (parsed == null) {
        throw new Error(`Invalid color: ${color}`)
    }

    return parsed
}
