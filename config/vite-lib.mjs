import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

/**
 * Vite config for building the published library bundle.
 *
 * @param   {string}                    name         - The name of the package.
 * @param   {string}                    tsConfigPath - The tsconfig used when building types.
 * @param   {string[]}                  entrypoints  - The package entrypoint(s).
 * @param   {Record<string, unknown>}   pkg          - The package.json object.
 * @returns {import('vite').UserConfig}              - The Vite configuration object.
 */
export function buildViteConfig(name, tsConfigPath, entrypoints, pkg) {
    return defineConfig({
        build: {
            emptyOutDir: true,
            lib: {
                cssFileName: 'style',
                entry: entrypoints,
                fileName: (_, n) => `${n}.js`,
                formats: ['es'],
                name: name,
            },
            rollupOptions: {
                external: [...buildExternals(pkg), 'react', 'react-dom', 'react/jsx-runtime'],
                output: {
                    banner: '"use client";',
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                        'react/jsx-runtime': 'react/jsx-runtime',
                    },
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
                tsconfigPath: tsConfigPath,
            }),
        ],
    })
}

/**
 * Externalize everything declared as a dependency or peer dependency.
 *
 * `devDependencies` are deliberately *not* externalized: the repo is a single
 * package, so its dev dependencies are the whole toolchain (Next.js, Fumadocs,
 * ESLint, …) rather than things the library imports. Anything the published
 * bundle actually imports has to be declared in `dependencies`, and the pack
 * smoke test (`pnpm smoke:pack`) fails if that ever stops being true.
 *
 * @param {Object} packageJson - The package.json object.
 * @param {Object.<string, string>} [packageJson.dependencies]
 * @param {Object.<string, string>} [packageJson.peerDependencies]
 * @returns {RegExp[]} An array of regular expressions for external dependencies.
 */
function buildExternals(packageJson) {
    const externals = []

    const groups = [packageJson.dependencies, packageJson.peerDependencies]

    for (const group of groups) {
        if (group == null) {
            continue
        }

        for (const key of Object.keys(group)) {
            externals.push(new RegExp(`^${key}`))
        }
    }

    return externals
}
