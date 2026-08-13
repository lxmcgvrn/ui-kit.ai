import fs from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'

const componentsDir = path.join(__dirname, '..')

/**
 * Every component lives in its own folder, entered through `index.tsx`.
 * Directories without one (`__tests__`, `hooks`, `styles`, `types`) are not
 * components.
 */
const componentEntries = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ dir: entry.name, file: path.join(componentsDir, entry.name, 'index.tsx') }))
    .filter((entry) => fs.existsSync(entry.file))

describe('Named exports should have displayName', async () => {
    for (const { dir, file } of componentEntries) {
        const module = await import(file)

        Object.keys(module)
            .filter((key) => key !== 'default')
            .forEach((exportName) => {
                test(`Export "${exportName}" in ${dir} should have a displayName`, () => {
                    const exportValue = module[exportName]
                    expect(
                        exportValue.displayName,
                        `Export "${exportName}" in ${dir} should have a displayName`
                    ).toBeDefined()
                })
            })
    }
})
