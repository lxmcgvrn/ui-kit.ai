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

describe('Named exports should have displayName', async () => {
  for (const { dir, file } of componentEntries) {
    const module = (await import(file)) as Record<string, undefined | { displayName?: unknown }>

    Object.keys(module)
      .filter((key) => key !== 'default')
      .forEach((exportName) => {
        test(`Export "${exportName}" in ${dir} should have a displayName`, () => {
          const exportValue = module[exportName]
          expect(exportValue?.displayName, `Export "${exportName}" in ${dir} should have a displayName`).toBeDefined()
        })
      })
  }
})
