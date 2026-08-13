import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import packageJson from './package.json' with { type: 'json' }

const root = import.meta.dirname

/**
 * Externalize everything declared as a dependency or peer dependency.
 *
 * `devDependencies` are deliberately *not* externalized: the repo is a single
 * package, so its dev dependencies are the whole toolchain (Next.js, Fumadocs,
 * ESLint, …) rather than things the library imports. Anything the published
 * bundle actually imports has to be declared in `dependencies`, and the pack
 * smoke test (`pnpm smoke:pack`) fails if that ever stops being true.
 */
/** @type {{ dependencies?: Record<string, string>; peerDependencies?: Record<string, string> }} */
const pkg = packageJson

const external = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
].map((name) => new RegExp(`^${name}`))

/** Vite config for building the published library bundle. */
export default defineConfig({
    build: {
        emptyOutDir: true,
        lib: {
            cssFileName: 'style',
            entry: [path.resolve(root, 'src/components/index.ts')],
            fileName: (_, name) => `${name}.js`,
            // ESM only — the package is `"type": "module"` and ships no UMD
            // build, so there is no need for a global name or globals map.
            formats: ['es'],
        },
        rollupOptions: {
            external,
            output: {
                banner: '"use client";',
                preserveModules: true,
            },
        },
    },
    define: {
        'import.meta.vitest': 'undefined',
    },
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
            tsconfigPath: path.resolve(root, 'tsconfig.build.json'),
        }),
    ],
})
