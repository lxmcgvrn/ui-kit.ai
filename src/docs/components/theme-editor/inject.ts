const STYLE_ID = 'theme-editor-override'

/** Appends the generated theme to the document head, after the stylesheet. */
export function applyThemeCss(css: string) {
  if (typeof document === 'undefined') return

  styleElement().textContent = toRuntimeCss(css)
}

/** Hands the page back to the theme the site shipped with. */
export function removeThemeCss() {
  if (typeof document === 'undefined') return

  document.getElementById(STYLE_ID)?.remove()
}

function styleElement() {
  const existing = document.getElementById(STYLE_ID)
  if (existing instanceof HTMLStyleElement) return existing

  const created = document.createElement('style')
  created.id = STYLE_ID
  document.head.append(created)

  return created
}

/* Tailwind resolves `@theme`, `@utility` and `--color-*` at build time. */
function toRuntimeCss(css: string) {
  const [themeBlock = ''] = css.split('@utility')

  return themeBlock
    .split('\n')
    .filter((line) => !line.includes('--color-*'))
    .join('\n')
    .replace('@theme {', ':root {')
}
