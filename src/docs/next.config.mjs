import { createMDX } from 'fumadocs-mdx/next'
import path from 'node:path'

const withMDX = createMDX()

const repoRoot = path.resolve(import.meta.dirname, '../..')

/** Mirror in this app's tsconfig, the root tsconfig and vitest.config.mjs. */
const resolveAlias = {
    '@ui-kit.ai/components': path.resolve(repoRoot, 'src/components/index.ts'),
    '@ui-kit.ai/mocks': path.resolve(repoRoot, 'src/mocks/index.ts'),
    '@ui-kit.ai/theme': path.resolve(repoRoot, 'src/theme/index.ts'),
}

/** @typedef {{ resolve: { alias?: Record<string, string> } }} WebpackConfig */

/** @type {import('next').NextConfig} */
const config = {
    // The repo root owns linting (`pnpm check:eslint`).
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        // Next's image optimizer is unavailable in a static export.
        unoptimized: true,
    },
    // Fully static site — the build output in `out/` is what gets deployed.
    output: 'export',
    // Next otherwise guesses the tracing root, and warns about it.
    outputFileTracingRoot: repoRoot,
    // `ts-morph` (used by AutoTypeTable) runs server-side and is CommonJS-ish.
    serverExternalPackages: ['ts-morph'],
    turbopack: {
        // Otherwise inferred from the lockfile dir, breaking `app/` lookup.
        root: repoRoot,
    },

    /**
     * Turbopack takes `resolveAlias`; webpack needs it merged in by hand.
     * @param {WebpackConfig} webpackConfig Next's own defaults.
     * @returns {WebpackConfig} The same config, plus our aliases.
     */
    webpack: (webpackConfig) => {
        webpackConfig.resolve.alias = {
            ...webpackConfig.resolve.alias,
            ...resolveAlias,
        }

        return webpackConfig
    },
}

export default withMDX(config)
