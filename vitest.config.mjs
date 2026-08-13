import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

const root = import.meta.dirname

const setupFiles = [path.resolve(root, 'vitest.setup.ts')]

/**
 * The repo is a single package, but the docs app imports the library by its
 * published name so documentation snippets stay copy-pasteable. These aliases
 * point those names back at source, and must stay in sync with `tsconfig.json`,
 * `docs/tsconfig.json` and `docs/next.config.mjs`.
 */
const alias = {
    '@ui-kit.ai/components': path.resolve(root, 'src/components/index.ts'),
    '@ui-kit.ai/mocks': path.resolve(root, 'src/mocks/index.ts'),
    '@ui-kit.ai/theme': path.resolve(root, 'src/theme/index.ts'),
}

/**
 * One project per test environment.
 *
 * @param   {string}                                       name        - Project name.
 * @param   {'jsdom' | 'node'}                             environment - Test environment.
 * @param   {string[]}                                     include     - Test file globs.
 * @returns {import('vitest/config').UserWorkspaceConfig}              - The project configuration.
 */
function project(name, environment, include) {
    return {
        plugins: [react()],
        resolve: { alias },
        test: {
            environment,
            globals: true,
            include,
            name,
            root,
            setupFiles,
        },
    }
}

export default defineConfig({
    test: {
        exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
        passWithNoTests: true,
        workspace: [
            project('theme', 'node', ['src/theme/**/*.test.{js,cjs,mjs,ts,tsx}']),
            project('components', 'jsdom', [
                'src/components/**/*.test.{js,cjs,mjs,ts,tsx}',
                'src/mocks/**/*.test.{js,cjs,mjs,ts,tsx}',
            ]),
            project('docs', 'jsdom', ['docs/**/*.test.{js,cjs,mjs,ts,tsx}']),
        ],
    },
})
