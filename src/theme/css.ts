import type { Properties } from 'csstype'

/** CSS properties in camelCase, custom properties, and nested rules. */
export type Block = CustomProperties & Declarations & NestedRules

/** Custom properties are case-sensitive, so they skip the kebab-case fold. */
type CustomProperties = Record<`--${string}`, number | string>

/** An array declares one property twice — a fallback, then the upgrade. */
type Declarations = {
  [Property in keyof Properties<string>]?: Properties<string>[Property] | readonly string[]
}

/** Keyed by a nesting selector, which every CSS nested rule has to start with. */
interface NestedRules {
  [selector: `&${string}`]: Block
}

type Value = Block | number | readonly string[] | string

const INDENT = '    '

/** Wraps `block` in a selector or at-rule prelude. */
export function rule(prelude: string, block: Block): string {
  return `${prelude} {\n${serialize(block, INDENT)}\n}`
}

/** A Tailwind `@utility`, which is a rule whose prelude names the class. */
export function utility(name: string, block: Block): string {
  return rule(`@utility ${name}`, block)
}

function isBlock(value: Value): value is Block {
  return typeof value === 'object' && !Array.isArray(value)
}

function kebabCase(property: string): string {
  return property.startsWith('--') ? property : property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

function lines(key: string, value: Value, indent: string): string[] {
  if (isBlock(value)) {
    return [`${indent}${key} {\n${serialize(value, indent + INDENT)}\n${indent}}`]
  }

  const property = kebabCase(key)

  return valueList(value).map((each) => `${indent}${property}: ${each};`)
}

function serialize(block: Block, indent: string): string {
  const entries = Object.entries(block) as [string, Value][]

  return entries.flatMap(([key, value]) => lines(key, value, indent)).join('\n')
}

function valueList(value: number | readonly string[] | string): readonly string[] {
  return typeof value === 'object' ? value : [String(value)]
}
