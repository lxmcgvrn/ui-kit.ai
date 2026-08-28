import react from '@vitejs/plugin-react'
import ariaVariants from 'aria-variants/vite'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import packageJson from './package.json' with { type: 'json' }

const root = import.meta.dirname

/** @type {{ dependencies?: Record<string, string>; peerDependencies?: Record<string, string> }} */
const pkg = packageJson

/** Externalize deps/peerDeps; devDeps are toolchain, guarded by smoke:pack. */
const external = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})].map((name) => new RegExp(`^${name}`))

/** Vite config for building the published library bundle. */
export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      cssFileName: 'style',
      entry: [path.resolve(root, 'src/components/index.ts')],
      fileName: (_, name) => `${name}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external,
      output: {
        banner: '"use client";',
        preserveModules: true,
        preserveModulesRoot: path.resolve(root, 'src/components'),
      },
    },
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [
    ariaVariants(),
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: path.resolve(root, 'tsconfig.build.json'),
    }),
  ],
})
