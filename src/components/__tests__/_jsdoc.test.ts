import fs from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'

const componentsDir = path.join(__dirname, '..')

/** Component modules are the top-level `.tsx` files. */
const componentEntries = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx'))
  .map((entry) => ({
    dir: path.basename(entry.name, '.tsx'),
    file: path.join(componentsDir, entry.name),
  }))

describe.skip('JSDoc comments for named exports', async () => {
  for (const { dir, file } of componentEntries) {
    const fileContent = fs.readFileSync(file, 'utf8')
    const module = (await import(file)) as Record<string, unknown>

    Object.keys(module)
      .filter((key) => key !== 'default')
      .forEach((exportName) => {
        test(`Export "${exportName}" in ${dir} should have a JSDoc comment`, () => {
          const jsDocRegex = new RegExp(`\\/\\*\\*[\\s\\S]*?\\*\\/[\\s]*export[^]*?${exportName}`)
          expect(jsDocRegex.test(fileContent), `Export "${exportName}" in ${dir} should have a JSDoc comment`).toBe(true)
        })
      })
  }
})
