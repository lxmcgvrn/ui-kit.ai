/** A lowercase token as a field label. */
export function toLabel(token: string) {
    return token.charAt(0).toUpperCase() + token.slice(1)
}
