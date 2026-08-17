import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

const root = import.meta.dirname

const setupFiles = [path.resolve(root, 'vitest.setup.ts')]

/** Published name → source. Mirror in tsconfig, docs tsconfig, next.config. */
const alias = {
  '@ui-kit.ai/components': path.resolve(root, 'src/components/index.ts'),
  '@ui-kit.ai/mocks': path.resolve(root, 'src/mocks/index.ts'),
  '@ui-kit.ai/theme': path.resolve(root, 'src/theme/index.ts'),
}

/**
 * One project per test environment.
 * @param {string} name Shown in vitest's output.
 * @param {'jsdom' | 'node'} environment Anything touching the DOM needs jsdom.
 * @param {string[]} include Globs, resolved from the repo root.
 * @returns {import('vitest/config').UserWorkspaceConfig} One `workspace` entry.
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
      project('components', 'jsdom', ['src/components/**/*.test.{js,cjs,mjs,ts,tsx}', 'src/mocks/**/*.test.{js,cjs,mjs,ts,tsx}']),
      project('docs', 'jsdom', ['src/docs/**/*.test.{js,cjs,mjs,ts,tsx}']),
    ],
  },
})
