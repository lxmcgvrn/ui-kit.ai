import path from 'node:path'

import { buildViteConfig } from './config/vite-lib.mjs'
import packageJson from './package.json' with { type: 'json' }

export default buildViteConfig(
    packageJson.name,
    path.resolve(import.meta.dirname, 'tsconfig.build.json'),
    [path.resolve(import.meta.dirname, 'src/components/index.ts')],
    packageJson
)
