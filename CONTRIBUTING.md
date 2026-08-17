# Contributing to ui-kit.ai

## Project Setup

This repo is a **single npm package** — `@ui-kit.ai/components`. There is no workspace: one
`package.json`, one lockfile, one `node_modules`. All tooling (ESLint, Prettier, TypeScript, Vite
and Vitest) is configured once at the repo root.

## Structure

- `src/components` - Core UI components (this is what gets published, as `dist/`). Each component
  is a self-contained folder holding only source: `index.tsx` and friends. `hooks`, `styles` and
  `types` are shared across them
- `src/theme` - Design tokens and the palette generator
- `src/mocks` - Mock API handlers used by the docs demos
- `src/docs` - Documentation site (Next.js + Fumadocs, static export to `src/docs/out`). It owns
  every page under `src/docs/content/docs` and every demo under `src/docs/components/examples`

Docs live in the docs app, not next to the components. Fumadocs watches its content directory, so
colocating pages in `src/components` made every component edit invalidate the whole docs route.

The docs site imports the library by its published name (`@ui-kit.ai/components`,
`@ui-kit.ai/theme`, `@ui-kit.ai/mocks`) so documentation snippets stay copy-pasteable, but those
names are **aliased to source** — there is no build step between editing a component and seeing it
in the docs. The aliases are declared in four places, and all four must agree:

- `tsconfig.json` (`compilerOptions.paths`)
- `src/docs/tsconfig.json` (`compilerOptions.paths`)
- `src/docs/next.config.mjs` (`turbopack.resolveAlias` **and** the `webpack` alias)
- `vitest.config.mjs` (`resolve.alias`)

## Development Workflow

- `pnpm dev` - generate the theme CSS, then run the docs site at http://localhost:3000
- `pnpm build` - build the library (`dist/`) and the docs export (`src/docs/out/`)
- `pnpm check` - run every check (Prettier, ESLint, `tsc`, Vitest)
- `pnpm fix` - autofix formatting and lint issues
- `pnpm gen:theme` - regenerate `src/theme/generated/style.css` (not checked in)
- `pnpm smoke:pack` - pack the library, install the tarball into a scratch project and import it

`smoke:pack` is the guard-rail for the published dependency list: because everything shares one
`node_modules`, a runtime import that should be a `dependency` will resolve fine locally even if it
is only a `devDependency`. Run `pnpm build` first — it needs `dist/`.

## Adding a component to the docs

A page's MDX and its demos both live in the docs app; only the component source stays in
`src/components`.

1. Export a `<Component>Props` **interface** from `src/components/<component>/index.tsx`, declared
   directly above the component, with a doc comment on every member — that is what the props table
   is generated from. Prefer `interface X extends Y {}` over a type alias, and give any generic
   parameter a default (`<T extends object = object>`) so it can be resolved by bare name.
2. Add demo files under `src/docs/components/examples/<component>/<variant>.tsx`, each with
   `'use client'` and a default export.
3. Add the page at `src/docs/content/docs/components/<component>.mdx` with `title` and
   `description` frontmatter, and list `<component>` in
   `src/docs/content/docs/components/meta.json`, which orders the sidebar.
4. Import each demo with the `@/` alias
   (`import Demo from '@/components/examples/<component>/<variant>'`) and wrap it in
   `<ComponentPreview name='<component>/<variant>'>`, where `name` is the demo's path under the
   examples root, without the extension.
5. Render the props table with
   `<AutoTypeTable name='<Component>Props' path='../components/<component>/index.tsx' />` — that
   path resolves from `src/docs`, so it points at the library source.

## Commits and Releases

- This project follows [Conventional Commits](https://www.conventionalcommits.org/)
- Format: `type(scope): message` (e.g., `feat(button): add size variants`)
- Automated releases are generated based on commit messages
- The library and the docs share one package: use `docs:` or `chore:` for docs-only changes so
  release-please does not bump (and publish) the library for them; reserve `fix:`/`feat:` for
  changes to the published code

## Pull Request Process

1. Create a branch with format `type/description` (e.g., `feat/button-variants`)
2. Make your changes
3. Ensure checks pass: `pnpm check`
4. Submit a pull request
