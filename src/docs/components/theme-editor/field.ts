/** A label column, then the control. Every editor row shares it so they line up. */
export const FIELD_ROW = 'grid grid-cols-[5rem_1fr] items-center gap-3'

/** A lowercase token as a field label. */
export function toLabel(token: string) {
    return token.charAt(0).toUpperCase() + token.slice(1)
}
