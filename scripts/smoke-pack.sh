#!/usr/bin/env bash
#
# Pack the library exactly as it would be published, install the tarball into a
# throwaway project and import it.
#
# This is the guard-rail for dependency drift: the repo is a single package, so
# every tool in the tree shares one `node_modules` and a runtime import that
# should have been a `dependency` will happily resolve during local development
# even if it is only listed under `devDependencies`. A real install from the
# tarball has no such safety net, so this catches it.
#
# Requires `pnpm build:lib` (or `pnpm build`) to have run first.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PKG_NAME="$(node -p "require('$ROOT/package.json').name")"

if [ ! -f "$ROOT/dist/index.js" ]; then
    echo "smoke:pack: dist/index.js is missing — run 'pnpm build:lib' first." >&2
    exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "smoke:pack: packing $PKG_NAME"
pnpm pack --pack-destination "$TMP" >/dev/null

TARBALL="$(find "$TMP" -maxdepth 1 -name '*.tgz' | head -n 1)"
if [ -z "$TARBALL" ]; then
    echo "smoke:pack: 'pnpm pack' produced no tarball." >&2
    exit 1
fi

CONSUMER="$TMP/consumer"
mkdir -p "$CONSUMER"
cd "$CONSUMER"

echo "smoke:pack: installing tarball into a scratch project"
npm init -y >/dev/null
npm install --no-audit --no-fund --loglevel=error "$TARBALL" >/dev/null

INSTALLED="$CONSUMER/node_modules/$PKG_NAME"

for file in "dist/index.js" "dist/index.d.ts" "dist/style.css" "package.json"; do
    if [ ! -f "$INSTALLED/$file" ]; then
        echo "smoke:pack: '$file' is missing from the installed package." >&2
        exit 1
    fi
done

echo "smoke:pack: resolving subpath exports"
node --input-type=module -e "
    import { createRequire } from 'node:module'
    const require = createRequire('$CONSUMER/index.js')
    require.resolve('$PKG_NAME/style.css')
    require.resolve('$PKG_NAME/package.json')
"

echo "smoke:pack: importing $PKG_NAME"
node --input-type=module -e "
    const mod = await import('$PKG_NAME')
    if (typeof mod.Button !== 'function') {
        throw new Error('Expected a Button export from $PKG_NAME')
    }
"

echo "smoke:pack: OK"
