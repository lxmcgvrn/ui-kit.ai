/** A label column, then the control. Every editor row shares it so they line up. */
export const FIELD_ROW = 'grid grid-cols-[5rem_1fr] items-center gap-3'

/** A label, then a colour, then room for the card's chevron. */
export const CARD_ROW = 'grid grid-cols-[6.5rem_1fr_1.75rem] items-center gap-2'

/** Heads one run of settings within the drawer. */
export const SECTION_HEADING = 'text-hi-contrast text-sm font-semibold'

/** A lowercase token as a field label. */
export function toLabel(token: string) {
    return token.charAt(0).toUpperCase() + token.slice(1)
}
