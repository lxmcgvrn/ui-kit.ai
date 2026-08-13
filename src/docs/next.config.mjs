import { createMDX } from 'fumadocs-mdx/next'
import path from 'node:path'

const withMDX = createMDX()

const repoRoot = path.resolve(import.meta.dirname, '../..')

/**
 * The docs app consumes the library's *source*, not its build output, so
 * editing a component hot-reloads instantly and Tailwind scans real source
 * files. The aliases have to be mirrored in `tsconfig.json` (both this app's
 * and the repo root's) and in `vitest.config.mjs`.
 */
const resolveAlias = {
    '@ui-kit.ai/components': path.resolve(repoRoot, 'src/components/index.ts'),
    '@ui-kit.ai/mocks': path.resolve(repoRoot, 'src/mocks/index.ts'),
    '@ui-kit.ai/theme': path.resolve(repoRoot, 'src/theme/index.ts'),
}

/** @type {import('next').NextConfig} */
const config = {
    // Linting is owned by the repo root (`pnpm check:eslint`).
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        // Next's image optimizer is unavailable in a static export.
        unoptimized: true,
    },
    // Fully static site — the build output in `out/` is what gets deployed.
    output: 'export',
    // The app lives in a subdirectory of the package it documents; point file
    // tracing at the repo root so Next stops guessing (and warning) about it.
    outputFileTracingRoot: repoRoot,
    // `ts-morph` (used by AutoTypeTable) is a server-only, CommonJS-ish dep.
    serverExternalPackages: ['ts-morph'],
    turbopack: {
        resolveAlias,
        // Turbopack otherwise infers its filesystem root from the nearest
        // lockfile — which is the repo root — and then looks for `app/` there.
        root: repoRoot,
    },
    webpack: (webpackConfig) => {
        webpackConfig.resolve.alias = {
            ...webpackConfig.resolve.alias,
            ...resolveAlias,
        }

        return webpackConfig
    },
}

export default withMDX(config)
