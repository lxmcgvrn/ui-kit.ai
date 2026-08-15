/** The board a translucent color sits on, so its alpha reads as alpha. */
export function checkerboard(size: string) {
    return `repeating-conic-gradient(var(--theme-default-bg-tint) 0% 25%, var(--theme-default-bg-base) 0% 50%) 50% / ${size} ${size}`
}
