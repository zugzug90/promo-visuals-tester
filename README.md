# YG Promo Visuals Tester

React + Vite project for testing promo covers and icons.

## Build Modes

- `npm run build` - default production build for root hosting (`/`).
- `npm run build:gh-pages` - build for GitHub Pages with relative asset paths (no hardcoded repo name).
- `npm run build:static` - portable build with relative paths (`./`), useful for generic static hosts and nested folders.

## Local Check

1. `npm ci`
2. `npm run build:gh-pages` (or another build mode)
3. `npm run preview`

## Notes About Paths

- Public assets are generated with `import.meta.env.BASE_URL`, so they work with different base paths.
- Favicon path in `index.html` uses `%BASE_URL%` for subpath-safe hosting.
- Relative base (`./`) avoids 404 when repository name or mount path differs from expected.
