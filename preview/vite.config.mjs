import tailwindcss from '@tailwindcss/postcss'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

const root = import.meta.dirname

/** Vite config for the component preview harness — never built or published. */
export default defineConfig({
    css: { postcss: { plugins: [tailwindcss()] } },
    plugins: [react()],
    resolve: {
        alias: {
            '@ui-kit.ai/components': path.resolve(root, '../src/components/index.ts'),
            '@ui-kit.ai/theme': path.resolve(root, '../src/theme/index.ts'),
        },
    },
    root,
    server: { fs: { allow: [path.resolve(root, '..')] } },
})
