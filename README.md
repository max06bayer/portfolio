# Maximilian Bayer — Portfolio

SvelteKit 2 / Svelte 5, built as a static website for GitHub Pages.

Live website: https://max06bayer.github.io/portfolio/

Repository: https://github.com/max06bayer/portfolio

Push changes to `main` to deploy updates automatically.

## Local development

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173/.

```sh
npm run check
npm run build
npm run preview
```

## GitHub Pages

Push the project to a GitHub repository on its `main` branch. In **Settings → Pages**, select **GitHub Actions** as the source. The included workflow builds and deploys the `build/` directory.

The workflow reads GitHub's configured Pages base path automatically, supporting repository sites, account sites, and custom domains. To build manually for a repository site:

```sh
BASE_PATH=/portfolio npm run build
```

Use an empty base path for an account site or custom domain.

## Design and editing

The reference is Figma file `fzo4ZS7C46N8I2ZRP6q0Nd`, node `9:1688`, measuring 1920 × 13390.

- Coordinates are measured in Figma CSS pixels and scale uniformly to the available browser width, capped at 1920 CSS pixels. Screen device pixel ratio does not enlarge the layout.
- The page has the requested 1 cm top offset (approximately 38 CSS pixels).
- The hero title, drone, grid, light effects, and footer artwork are lossless Figma exports. They require no shader runtime or special browser flags.
- Project descriptions remain native selectable text, with self-hosted Geist variable fonts.
- Images preserve Figma's crops and grading through individually exported layers.
- Edit URLs in `src/lib/links.ts`. Contact and all supplied social/Docuflex destinations are connected. Delphi has no destination. Legal, Privacy, and Cookies link to prerendered subpages.
- Edit measured layout and text in `src/lib/design/`. Components live in `src/lib/DesignLayer.svelte` and `src/lib/DesignText.svelte`.
- `design-reference/` holds the captured source, measurements, and original assets for comparison. `scripts/import-design.mjs` can regenerate the manifests.

The original design's text spelling is preserved, with the requested linked grey Docuflex mention added to the introduction. The narrow-screen layout preserves the composition by scaling the same canvas; a separately designed mobile layout is not included.

## Privacy and legal pages

`/legal/`, `/privacy/`, and `/cookies/` use the shared Geist typography and dark layout. They describe this personal, noncommercial portfolio, GitHub Pages hosting, Gmail contact, self-hosted assets, and the absence of analytics and application cookies. Update these notices if the host, contact provider, or tracking features change. Regular text uses variable font weight 350; headings remain 500.
