/** A terse element signature — tag, role, and data attributes — for assertions. */
export function describeElement(element: Element) {
  return `${element.tagName.toLowerCase()}[${[...element.attributes]
    .filter(({ name }) => name.startsWith('data-') || name === 'role')
    .map(({ name, value }) => `${name}=${value}`)
    .join(' ')}]`
}

/** Everything on the page drawing a focus ring, so a stray second ring fails. */
export function ringedElements() {
  return [...document.body.querySelectorAll('*')].filter((element) => getComputedStyle(element).outlineWidth !== '0px').map(describeElement)
}
