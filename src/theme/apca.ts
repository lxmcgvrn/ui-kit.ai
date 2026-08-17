import type { Oklch } from 'culori'

import { converter } from 'culori'

/** Weights of the sRGB primaries, summed into APCA's screen luminance. */
const COEFFICIENTS = { b: 0.072175, g: 0.7151522, r: 0.2126729 }

/** Near-black is soft-clamped: flare on a real screen lifts it off the floor. */
const BLACK_CLAMP = 1.414
const BLACK_THRESHOLD = 0.022

/** Pairs this close are unreadable at any size, so they score a flat zero. */
const LOW_CLIP = 0.1

/** Trims the toe of the curve, where a point of Lc is worth less than it looks. */
const LOW_OFFSET = 0.027

/** Luminances closer than this are the same color, give or take rounding. */
const MIN_LIGHT_DELTA = 0.0005

/** Dark-on-light and light-on-dark are not mirror images, so each gets a pair. */
const NORMAL_BACKGROUND_EXPONENT = 0.56
const NORMAL_TEXT_EXPONENT = 0.57
const REVERSE_BACKGROUND_EXPONENT = 0.65
const REVERSE_TEXT_EXPONENT = 0.62

const SCALE = 1.14

/** APCA reads sRGB's transfer curve as a plain power law, not the piecewise one. */
const SCREEN_GAMMA = 2.4

const toRgb = converter('rgb')

/** APCA-W3 0.1.9 contrast in Lc. Positive is dark text, negative is light. */
export function apcaLc(text: Oklch, background: Oklch): number {
  const backgroundLight = clampBlack(screenLuminance(background))
  const textLight = clampBlack(screenLuminance(text))

  if (Math.abs(backgroundLight - textLight) < MIN_LIGHT_DELTA) {
    return 0
  }

  const [polarity, backgroundExponent, textExponent] =
    backgroundLight > textLight
      ? ([1, NORMAL_BACKGROUND_EXPONENT, NORMAL_TEXT_EXPONENT] as const)
      : ([-1, REVERSE_BACKGROUND_EXPONENT, REVERSE_TEXT_EXPONENT] as const)

  const magnitude = polarity * (backgroundLight ** backgroundExponent - textLight ** textExponent) * SCALE

  return magnitude < LOW_CLIP ? 0 : polarity * (magnitude - LOW_OFFSET) * 100
}

/** A display clips what it cannot show, so out-of-gamut channels clip too. */
function channelLight(value: number): number {
  return Math.min(Math.max(value, 0), 1) ** SCREEN_GAMMA
}

function clampBlack(light: number): number {
  return light > BLACK_THRESHOLD ? light : light + (BLACK_THRESHOLD - light) ** BLACK_CLAMP
}

function screenLuminance(color: Oklch): number {
  const { b, g, r } = toRgb(color)

  return COEFFICIENTS.b * channelLight(b) + COEFFICIENTS.g * channelLight(g) + COEFFICIENTS.r * channelLight(r)
}
